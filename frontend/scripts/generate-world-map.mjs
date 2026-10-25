import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const topology = require('world-atlas/countries-110m.json');
const { feature } = require('topojson-client');
const countries = require('countries-list').countries;
const isoCountries = require('i18n-iso-countries');

const width = 1000;
const height = 520;
const simplifyTolerance = 0.65;
const minLatitude = -75;
const maxLatitude = 85;
const miller = (latitude) => Math.log(Math.tan(Math.PI / 4 + 0.4 * latitude * Math.PI / 180)) / 0.8;
const minMiller = miller(minLatitude);
const maxMiller = miller(maxLatitude);

function project([longitude, latitude]) {
  const clampedLatitude = Math.max(minLatitude, Math.min(maxLatitude, latitude));
  const y = miller(clampedLatitude);
  return [
    ((longitude + 180) / 360) * width,
    ((maxMiller - y) / (maxMiller - minMiller)) * height,
  ];
}

function unwrapRing(coordinates) {
  const openRing = coordinates.slice(0, -1);
  if (openRing.length === 0) return [];
  const unwrapped = [[...openRing[0]]];
  for (const [longitude, latitude] of openRing.slice(1)) {
    let adjustedLongitude = longitude;
    const previousLongitude = unwrapped[unwrapped.length - 1][0];
    while (adjustedLongitude - previousLongitude > 180) adjustedLongitude -= 360;
    while (adjustedLongitude - previousLongitude < -180) adjustedLongitude += 360;
    unwrapped.push([adjustedLongitude, latitude]);
  }
  const closingLongitude = openRing[0][0] + 360 * Math.round(
    (unwrapped[unwrapped.length - 1][0] - openRing[0][0]) / 360,
  );
  unwrapped.push([closingLongitude, openRing[0][1]]);
  return unwrapped;
}

function clipRingAtLongitude(ring, boundary, keepGreater) {
  const isInside = ([longitude]) => keepGreater ? longitude >= boundary : longitude <= boundary;
  const output = [];
  let previous = ring[ring.length - 1];
  let previousInside = isInside(previous);
  for (const current of ring) {
    const currentInside = isInside(current);
    if (currentInside !== previousInside) {
      const ratio = (boundary - previous[0]) / (current[0] - previous[0]);
      output.push([boundary, previous[1] + ratio * (current[1] - previous[1])]);
    }
    if (currentInside) output.push(current);
    previous = current;
    previousInside = currentInside;
  }
  if (output.length > 0) output.push(output[0]);
  return output;
}

function clipRingToLongitudeZone(ring, zone) {
  const west = -180 + zone * 360;
  const east = 180 + zone * 360;
  const clipped = clipRingAtLongitude(clipRingAtLongitude(ring, west, true), east, false);
  return clipped.length >= 4 ? clipped : [];
}

function distanceToSegment(point, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  if (dx === 0 && dy === 0) return Math.hypot(point[0] - start[0], point[1] - start[1]);
  const t = Math.max(0, Math.min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(point[0] - start[0] - t * dx, point[1] - start[1] - t * dy);
}

function simplifyOpenLine(points, tolerance) {
  if (points.length < 3) return points;
  let greatestDistance = 0;
  let farthestIndex = 0;
  for (let index = 1; index < points.length - 1; index += 1) {
    const distance = distanceToSegment(points[index], points[0], points[points.length - 1]);
    if (distance > greatestDistance) {
      greatestDistance = distance;
      farthestIndex = index;
    }
  }
  if (greatestDistance <= tolerance) return [points[0], points[points.length - 1]];
  const left = simplifyOpenLine(points.slice(0, farthestIndex + 1), tolerance);
  const right = simplifyOpenLine(points.slice(farthestIndex), tolerance);
  return [...left.slice(0, -1), ...right];
}

function simplifyRing(projectedRing) {
  const ring = projectedRing.slice(0, -1);
  if (ring.length < 4) return projectedRing;
  let farthestIndex = 1;
  let greatestDistance = 0;
  for (let index = 1; index < ring.length; index += 1) {
    const distance = Math.hypot(ring[index][0] - ring[0][0], ring[index][1] - ring[0][1]);
    if (distance > greatestDistance) {
      greatestDistance = distance;
      farthestIndex = index;
    }
  }
  const firstHalf = simplifyOpenLine(ring.slice(0, farthestIndex + 1), simplifyTolerance);
  const secondHalf = simplifyOpenLine([...ring.slice(farthestIndex), ring[0]], simplifyTolerance);
  const simplified = [...firstHalf.slice(0, -1), ...secondHalf.slice(0, -1)];
  if (simplified.length < 3) return projectedRing;
  return [...simplified, simplified[0]];
}

function ringToPath(ring) {
  return ring.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ') + ' Z';
}

const specialCountries = {
  'N. Cyprus': { id: 'NCY', continent: 'EU' },
  Somaliland: { id: 'XS', continent: 'AF' },
  Kosovo: { id: 'XK', continent: 'EU' },
};

const worldFeatures = feature(topology, topology.objects.countries).features;
const worldGeography = worldFeatures.flatMap((country) => {
  const numericCode = country.id == null ? null : String(country.id).padStart(3, '0');
  const alpha3 = numericCode ? isoCountries.numericToAlpha3(numericCode) : null;
  const alpha2 = alpha3 ? isoCountries.alpha3ToAlpha2(alpha3) : null;
  const special = specialCountries[country.properties.name];
  const metadata = alpha2 ? countries[alpha2] : null;
  const continent = metadata?.continent ?? special?.continent;
  if (!continent || continent === 'AN') return [];

  const id = alpha2 ?? special?.id;
  const name = (alpha2 && isoCountries.getName(alpha2, 'en')) || country.properties.name;
  if (!id || !name) throw new Error(`Missing country metadata for ${country.properties.name}`);

  const polygons = country.geometry.type === 'Polygon'
    ? [country.geometry.coordinates]
    : country.geometry.coordinates;
  const path = polygons.flatMap((polygon) => {
    const unwrappedRings = polygon.map(unwrapRing);
    const outer = unwrappedRings[0];
    if (!outer?.length) return [];
    const center = outer.reduce((sum, point) => sum + point[0], 0) / outer.length;
    const alignedRings = unwrappedRings.map((ring) => {
      const ringCenter = ring.reduce((sum, point) => sum + point[0], 0) / ring.length;
      const shift = 360 * Math.round((center - ringCenter) / 360);
      return ring.map(([longitude, latitude]) => [longitude + shift, latitude]);
    });
    const longitudes = alignedRings[0].map(([longitude]) => longitude);
    const firstZone = Math.floor((Math.min(...longitudes) + 180) / 360);
    const lastZone = Math.floor((Math.max(...longitudes) + 180 - Number.EPSILON) / 360);
    return Array.from({ length: lastZone - firstZone + 1 }, (_, offset) => {
      const zone = firstZone + offset;
      return alignedRings
        .map((ring) => clipRingToLongitudeZone(ring, zone))
        .filter((ring) => ring.length > 0)
        .map((ring) => ringToPath(simplifyRing(ring.map(([longitude, latitude]) => project([longitude - zone * 360, latitude])))))
        .join(' ');
    });
  }).join(' ');
  return [{ id, name, continent, path }];
});

const output = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/lib/world-map.ts');
const source = `export interface CountryData {
  id: string;
  name: string;
  continent: string;
  path: string;
}

// Generated from Natural Earth 1:110m country polygons. Run npm run generate:world-map.
export const WORLD_GEOGRAPHY: CountryData[] = ${JSON.stringify(worldGeography, null, 2)};
`;

await writeFile(output, source);
console.log(`Generated ${worldGeography.length} simplified country paths at ${output}`);
