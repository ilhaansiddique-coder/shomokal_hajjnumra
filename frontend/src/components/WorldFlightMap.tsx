'use client';

import { useEffect, useId, useState, type CSSProperties, type FocusEvent, type PointerEvent } from 'react';
import { WORLD_GEOGRAPHY } from '@/lib/world-map';

type RadarFilter = 'all' | 'mideast' | 'atlantic' | 'pacific';
type TooltipInfo = { name: string; continent: string; x: number; y: number };
type RouteStyle = CSSProperties & {
  '--route-duration': string;
  '--route-delay': string;
};

interface MuslimHub {
  iata: string;
  lon: number;
  lat: number;
  duration: string;
  delay: string;
  filter: Exclude<RadarFilter, 'all'> | 'all';
}

const WIDTH = 1000;
const HEIGHT = 520;
const MAP_SCALE_X = 0.92;
const MAP_SCALE_Y = 0.92;
const MAP_OFFSET_X = (WIDTH * (1 - MAP_SCALE_X)) / 2;
const MAP_OFFSET_Y = (HEIGHT * (1 - MAP_SCALE_Y)) / 2;
const MIN_LATITUDE = -75;
const MAX_LATITUDE = 85;
const miller = (latitude: number) => Math.log(Math.tan(Math.PI / 4 + 0.4 * ((latitude * Math.PI) / 180))) / 0.8;
const MIN_MILLER = miller(MIN_LATITUDE);
const MAX_MILLER = miller(MAX_LATITUDE);

const formatSvgNumber = (value: number) => value.toFixed(3);

const MECCA = { id: 'SA', name: 'Makkah · Mecca', lon: 39.8262, lat: 21.4225 };
const MUSLIM_HUBS: MuslimHub[] = [
  {
    iata: 'DAC',
    lon: 90.4125,
    lat: 23.8433,
    duration: '7s',
    delay: '0s',
    filter: 'all',
  },
  {
    iata: 'KHI',
    lon: 67.0099,
    lat: 24.8607,
    duration: '9s',
    delay: '0.8s',
    filter: 'pacific',
  },
  {
    iata: 'ISB',
    lon: 73.0992,
    lat: 33.6844,
    duration: '10s',
    delay: '1.6s',
    filter: 'pacific',
  },
  {
    iata: 'CGK',
    lon: 106.8456,
    lat: -6.2088,
    duration: '14s',
    delay: '2.4s',
    filter: 'pacific',
  },
  {
    iata: 'KUL',
    lon: 101.6869,
    lat: 3.139,
    duration: '13s',
    delay: '3.2s',
    filter: 'pacific',
  },
  {
    iata: 'KBL',
    lon: 69.2075,
    lat: 34.5553,
    duration: '11s',
    delay: '4s',
    filter: 'pacific',
  },
  {
    iata: 'TAS',
    lon: 69.2401,
    lat: 41.2995,
    duration: '12s',
    delay: '4.8s',
    filter: 'pacific',
  },
  {
    iata: 'IST',
    lon: 28.9784,
    lat: 41.0082,
    duration: '11s',
    delay: '0.4s',
    filter: 'mideast',
  },
  {
    iata: 'CAI',
    lon: 31.2357,
    lat: 30.0444,
    duration: '9s',
    delay: '1.2s',
    filter: 'mideast',
  },
  {
    iata: 'DXB',
    lon: 55.2708,
    lat: 25.2048,
    duration: '7s',
    delay: '2s',
    filter: 'mideast',
  },
  {
    iata: 'DOH',
    lon: 51.531,
    lat: 25.2854,
    duration: '7s',
    delay: '2.8s',
    filter: 'mideast',
  },
  {
    iata: 'KWI',
    lon: 47.9774,
    lat: 29.3759,
    duration: '7s',
    delay: '3.6s',
    filter: 'mideast',
  },
  {
    iata: 'MCT',
    lon: 58.4059,
    lat: 23.588,
    duration: '8s',
    delay: '4.4s',
    filter: 'mideast',
  },
  {
    iata: 'AMM',
    lon: 35.9304,
    lat: 31.9539,
    duration: '8s',
    delay: '5.2s',
    filter: 'mideast',
  },
  {
    iata: 'BGW',
    lon: 44.3661,
    lat: 33.3152,
    duration: '8s',
    delay: '6s',
    filter: 'mideast',
  },
  {
    iata: 'IKA',
    lon: 51.389,
    lat: 35.6892,
    duration: '9s',
    delay: '6.8s',
    filter: 'mideast',
  },
  {
    iata: 'CMN',
    lon: -7.5898,
    lat: 33.5731,
    duration: '13s',
    delay: '0.6s',
    filter: 'atlantic',
  },
  {
    iata: 'ALG',
    lon: 3.0588,
    lat: 36.7538,
    duration: '12s',
    delay: '1.4s',
    filter: 'atlantic',
  },
  {
    iata: 'TUN',
    lon: 10.1815,
    lat: 36.8065,
    duration: '11s',
    delay: '2.2s',
    filter: 'atlantic',
  },
  {
    iata: 'LOS',
    lon: 3.3792,
    lat: 6.5244,
    duration: '12s',
    delay: '3s',
    filter: 'atlantic',
  },
  {
    iata: 'DSS',
    lon: -17.4677,
    lat: 14.7167,
    duration: '14s',
    delay: '3.8s',
    filter: 'atlantic',
  },
  {
    iata: 'TIA',
    lon: 19.8187,
    lat: 41.3275,
    duration: '12s',
    delay: '4.6s',
    filter: 'atlantic',
  },
  {
    iata: 'GYD',
    lon: 49.8671,
    lat: 40.4093,
    duration: '10s',
    delay: '5.4s',
    filter: 'mideast',
  },
  {
    iata: 'BAH',
    lon: 50.586,
    lat: 26.2285,
    duration: '7s',
    delay: '6.2s',
    filter: 'mideast',
  },
  {
    iata: 'COO',
    lon: 2.3912,
    lat: 6.3703,
    duration: '13s',
    delay: '7s',
    filter: 'atlantic',
  },
  {
    iata: 'BWN',
    lon: 114.9398,
    lat: 4.9031,
    duration: '14s',
    delay: '7.8s',
    filter: 'pacific',
  },
  {
    iata: 'OUA',
    lon: -1.5197,
    lat: 12.3714,
    duration: '13s',
    delay: '8.6s',
    filter: 'atlantic',
  },
  {
    iata: 'NSI',
    lon: 11.5021,
    lat: 3.848,
    duration: '12s',
    delay: '9.4s',
    filter: 'atlantic',
  },
  {
    iata: 'NDJ',
    lon: 15.0444,
    lat: 12.1348,
    duration: '12s',
    delay: '0.2s',
    filter: 'atlantic',
  },
  {
    iata: 'HAH',
    lon: 43.2551,
    lat: -11.7172,
    duration: '13s',
    delay: '1s',
    filter: 'atlantic',
  },
  {
    iata: 'ABJ',
    lon: -4.0083,
    lat: 5.36,
    duration: '14s',
    delay: '1.8s',
    filter: 'atlantic',
  },
  {
    iata: 'JIB',
    lon: 43.1456,
    lat: 11.5721,
    duration: '10s',
    delay: '2.6s',
    filter: 'atlantic',
  },
  {
    iata: 'LBV',
    lon: 9.4673,
    lat: 0.4162,
    duration: '14s',
    delay: '3.4s',
    filter: 'atlantic',
  },
  {
    iata: 'BJL',
    lon: -16.579,
    lat: 13.4549,
    duration: '14s',
    delay: '4.2s',
    filter: 'atlantic',
  },
  {
    iata: 'CKY',
    lon: -13.5784,
    lat: 9.6412,
    duration: '14s',
    delay: '5s',
    filter: 'atlantic',
  },
  {
    iata: 'OXB',
    lon: -15.598,
    lat: 11.8636,
    duration: '14s',
    delay: '5.8s',
    filter: 'atlantic',
  },
  {
    iata: 'GEO',
    lon: -58.1551,
    lat: 6.8013,
    duration: '16s',
    delay: '6.6s',
    filter: 'atlantic',
  },
  {
    iata: 'NQZ',
    lon: 71.43,
    lat: 51.1694,
    duration: '14s',
    delay: '7.4s',
    filter: 'pacific',
  },
  {
    iata: 'FRU',
    lon: 74.5698,
    lat: 42.8746,
    duration: '12s',
    delay: '8.2s',
    filter: 'pacific',
  },
  {
    iata: 'BEY',
    lon: 35.5018,
    lat: 33.8938,
    duration: '9s',
    delay: '9s',
    filter: 'mideast',
  },
  {
    iata: 'TIP',
    lon: 13.1913,
    lat: 32.8872,
    duration: '11s',
    delay: '9.8s',
    filter: 'atlantic',
  },
  {
    iata: 'MLE',
    lon: 73.5093,
    lat: 4.1755,
    duration: '12s',
    delay: '0.6s',
    filter: 'pacific',
  },
  {
    iata: 'BKO',
    lon: -8.0029,
    lat: 12.6392,
    duration: '14s',
    delay: '1.4s',
    filter: 'atlantic',
  },
  {
    iata: 'NKC',
    lon: -15.9785,
    lat: 18.0735,
    duration: '14s',
    delay: '2.2s',
    filter: 'atlantic',
  },
  {
    iata: 'MPM',
    lon: 32.5732,
    lat: -25.9692,
    duration: '15s',
    delay: '3s',
    filter: 'atlantic',
  },
  {
    iata: 'NIM',
    lon: 2.1254,
    lat: 13.5117,
    duration: '13s',
    delay: '3.8s',
    filter: 'atlantic',
  },
  {
    iata: 'PSE',
    lon: 35.2034,
    lat: 31.9038,
    duration: '8s',
    delay: '4.6s',
    filter: 'mideast',
  },
  {
    iata: 'FNA',
    lon: -13.2317,
    lat: 8.4657,
    duration: '14s',
    delay: '5.4s',
    filter: 'atlantic',
  },
  {
    iata: 'MGQ',
    lon: 45.3182,
    lat: 2.0469,
    duration: '12s',
    delay: '6.2s',
    filter: 'atlantic',
  },
  {
    iata: 'KRT',
    lon: 32.5599,
    lat: 15.5007,
    duration: '11s',
    delay: '7s',
    filter: 'atlantic',
  },
  {
    iata: 'PBM',
    lon: -55.2038,
    lat: 5.852,
    duration: '16s',
    delay: '7.8s',
    filter: 'atlantic',
  },
  {
    iata: 'DAM',
    lon: 36.2765,
    lat: 33.5138,
    duration: '9s',
    delay: '8.6s',
    filter: 'mideast',
  },
  {
    iata: 'DYU',
    lon: 68.787,
    lat: 38.5598,
    duration: '12s',
    delay: '9.4s',
    filter: 'pacific',
  },
  {
    iata: 'LFW',
    lon: 1.2228,
    lat: 6.1256,
    duration: '13s',
    delay: '0.2s',
    filter: 'atlantic',
  },
  {
    iata: 'ASB',
    lon: 58.3261,
    lat: 37.9601,
    duration: '12s',
    delay: '1s',
    filter: 'pacific',
  },
  {
    iata: 'EBB',
    lon: 32.5825,
    lat: 0.3476,
    duration: '12s',
    delay: '1.8s',
    filter: 'atlantic',
  },
  {
    iata: 'SAH',
    lon: 44.191,
    lat: 15.3694,
    duration: '9s',
    delay: '2.6s',
    filter: 'mideast',
  },
];

const DHAKA = MUSLIM_HUBS[0];
const LABELLED_HUBS = new Set([
  'DAC',
  'KHI',
  'CGK',
  'KUL',
  'IST',
  'CAI',
  'DXB',
  'CMN',
  'LOS',
  'DSS',
  'KRT',
  'NQZ',
]);

const CONTINENTS = [
  { code: 'NA', name: 'North America' },
  { code: 'SA', name: 'South America' },
  { code: 'EU', name: 'Europe' },
  { code: 'AF', name: 'Africa' },
  { code: 'AS', name: 'Asia' },
  { code: 'OC', name: 'Oceania' },
];

function project(longitude: number, latitude: number): [number, number] {
  const clampedLatitude = Math.max(MIN_LATITUDE, Math.min(MAX_LATITUDE, latitude));
  const projectedLatitude = miller(clampedLatitude);
  return [((longitude + 180) / 360) * WIDTH, ((MAX_MILLER - projectedLatitude) / (MAX_MILLER - MIN_MILLER)) * HEIGHT];
}

function getRoutePath(origin: [number, number], destination: [number, number]) {
  const dx = destination[0] - origin[0];
  const dy = destination[1] - origin[1];
  const length = Math.hypot(dx, dy) || 1;
  const midpointX = (origin[0] + destination[0]) / 2;
  const midpointY = (origin[1] + destination[1]) / 2;
  const controlX = midpointX - (dy / length) * length * 0.25;
  const controlY = midpointY + (dx / length) * length * 0.25;
  return `M ${formatSvgNumber(origin[0])} ${formatSvgNumber(origin[1])} Q ${formatSvgNumber(controlX)} ${formatSvgNumber(controlY)} ${formatSvgNumber(destination[0])} ${formatSvgNumber(destination[1])}`;
}

function getSvgPoint(event: PointerEvent<SVGPathElement>) {
  const svg = event.currentTarget.ownerSVGElement;
  const matrix = svg?.getScreenCTM();
  if (!svg || !matrix) return null;
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(matrix.inverse());
}

export default function WorldFlightMap({ filter = 'all' }: { filter?: RadarFilter }) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [meccaX, meccaY] = project(MECCA.lon, MECCA.lat);
  const [dhakaX, dhakaY] = project(DHAKA.lon, DHAKA.lat);
  const visibleHubs = MUSLIM_HUBS.filter((hub) => filter === 'all' || hub.filter === 'all' || hub.filter === filter);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  const showTooltip = (name: string, continent: string, x: number, y: number) => {
    setHoveredContinent(continent);
    setTooltip({ name, continent, x, y });
  };

  const handleCountryPointerMove = (event: PointerEvent<SVGPathElement>) => {
    const point = getSvgPoint(event);
    if (point) {
      setTooltip((current) => (current ? { ...current, x: point.x, y: point.y } : null));
    }
  };

  const handleCountryFocus = (event: FocusEvent<SVGPathElement>, name: string, continent: string) => {
    const bounds = event.currentTarget.getBBox();
    const matrix = event.currentTarget.getCTM();
    const svg = event.currentTarget.ownerSVGElement;
    if (!matrix || !svg) return;
    const point = svg.createSVGPoint();
    point.x = bounds.x + bounds.width / 2;
    point.y = bounds.y + bounds.height / 2;
    const transformedPoint = point.matrixTransform(matrix);
    showTooltip(name, continent, transformedPoint.x, transformedPoint.y);
  };

  return (
    <div className="wfm-map">
      <svg
        className="wfm-canvas"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="group"
        aria-label="Interactive map of 57 OIC member states centered on Mecca, with animated routes to and from Dhaka"
      >
        <defs>
          <linearGradient id={`${id}-trail`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#83d99d" stopOpacity="0.08" />
            <stop offset="75%" stopColor="#83d99d" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <radialGradient id={`${id}-origin-glow`}>
            <stop offset="0%" stopColor="#9ef5b8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#006838" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="wfm-graticule" aria-hidden="true">
          {Array.from({ length: 9 }, (_, index) => (
            <line key={`lat-${index}`} x1="0" y1={index * 65} x2={WIDTH} y2={index * 65} />
          ))}
          {Array.from({ length: 13 }, (_, index) => (
            <line key={`lon-${index}`} x1={index * (WIDTH / 12)} y1="0" x2={index * (WIDTH / 12)} y2={HEIGHT} />
          ))}
        </g>

        <g transform={`translate(${MAP_OFFSET_X} ${MAP_OFFSET_Y}) scale(${MAP_SCALE_X} ${MAP_SCALE_Y})`}>
          <g className="wfm-countries">
            {WORLD_GEOGRAPHY.map((country) => {
              const isMecca = country.id === MECCA.id;
              const isHoveredContinent = country.continent === hoveredContinent;
              return (
                <path
                  key={country.id}
                  d={country.path}
                  className="wfm-country"
                  data-origin={isMecca || undefined}
                  data-highlighted={isHoveredContinent || undefined}
                  fill={isMecca ? '#1b6b43' : isHoveredContinent ? '#28764e' : '#172820'}
                  stroke="#526a5b"
                  strokeWidth="0.85"
                  fillRule="evenodd"
                  tabIndex={0}
                  aria-label={`${country.name}, ${CONTINENTS.find((item) => item.code === country.continent)?.name ?? country.continent}`}
                  onPointerEnter={(event) => {
                    const point = getSvgPoint(event);
                    if (point) showTooltip(country.name, country.continent, point.x, point.y);
                  }}
                  onPointerMove={handleCountryPointerMove}
                  onPointerLeave={() => {
                    setHoveredContinent(null);
                    setTooltip(null);
                  }}
                  onFocus={(event) => handleCountryFocus(event, country.name, country.continent)}
                  onBlur={() => {
                    setHoveredContinent(null);
                    setTooltip(null);
                  }}
                />
              );
            })}
          </g>

          <g className="wfm-routes">
            {visibleHubs.map((hub, index) => {
              const [hubX, hubY] = project(hub.lon, hub.lat);
              const routePath = getRoutePath([hubX, hubY], [meccaX, meccaY]);
              const routeId = `${id}-route-${hub.iata}`;
              const routeStyle: RouteStyle = {
                '--route-duration': '20s',
                '--route-delay': `${(index * 0.34) % 20}s`,
              };
              return (
                <g
                  key={hub.iata}
                  style={routeStyle}
                  data-dhaka={hub.iata === 'DAC' || undefined}
                  data-animated="true"
                >
                  <path id={routeId} d={routePath} className="wfm-guide" />
                  <path
                    d={routePath}
                    pathLength="1"
                    strokeDasharray="0.07 1"
                    strokeDashoffset="0.08"
                    stroke={hub.iata === 'DAC' ? '#ffe088' : '#8df5ce'}
                    className="wfm-trail"
                  />
                  {!reducedMotion && (
                    <g className="wfm-aircraft" aria-hidden="true">
                      <path
                        d="M-4,-2.5 L6,0 L-4,2.5 L-2,0 Z"
                        fill="#d8fff0"
                        stroke="#08734e"
                        strokeWidth="0.8"
                      >
                        <animateMotion
                          dur={routeStyle['--route-duration']}
                          begin={routeStyle['--route-delay']}
                          repeatCount="indefinite"
                          rotate="auto"
                        >
                          <mpath href={`#${routeId}`} />
                        </animateMotion>
                      </path>
                      {hub.iata === 'DAC' && (
                        <path
                          d="M-4,-2.5 L6,0 L-4,2.5 L-2,0 Z"
                          fill="#ffe088"
                          stroke="#7a5610"
                          strokeWidth="0.9"
                        >
                          <animateMotion
                            dur={routeStyle['--route-duration']}
                            begin="6s"
                            repeatCount="indefinite"
                            rotate="auto"
                            keyPoints="1;0"
                            keyTimes="0;1"
                            calcMode="linear"
                          >
                            <mpath href={`#${routeId}`} />
                          </animateMotion>
                        </path>
                      )}
                    </g>
                  )}
                </g>
              );
            })}
            {visibleHubs.map((hub) => {
              const [hubX, hubY] = project(hub.lon, hub.lat);
              return (
                <g
                  key={hub.iata}
                  transform={`translate(${formatSvgNumber(hubX)}, ${formatSvgNumber(hubY)})`}
                  className="wfm-destination"
                  data-dhaka={hub.iata === 'DAC' || undefined}
                >
                  <circle r={hub.iata === 'DAC' ? 4 : 2.8} />
                  {hub.iata === 'DAC' && <circle r="9" className="wfm-ping" />}
                  {LABELLED_HUBS.has(hub.iata) && (
                    <text x="6" y="3">
                      {hub.iata}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          <path
            d={getRoutePath([dhakaX, dhakaY], [meccaX, meccaY])}
            className="wfm-primary-corridor"
            aria-hidden="true"
          />

          <g transform={`translate(${formatSvgNumber(meccaX)}, ${formatSvgNumber(meccaY)})`} className="wfm-mecca" role="img" aria-label="Mecca, Saudi Arabia — Kaaba">
            <circle r="21" className="wfm-origin-glow" fill={`url(#${id}-origin-glow)`} />
            <circle r="17" className="wfm-mecca-ring" />
            <path className="wfm-kaaba-front" d="M-9,-6 L0,-11 L0,13 L-9,8 Z" />
            <path className="wfm-kaaba-side" d="M0,-11 L9,-6 L9,8 L0,13 Z" />
            <path className="wfm-kaaba-band" d="M-9,-3 L0,0 L9,-3 L9,0 L0,3 L-9,0 Z" />
            <path className="wfm-kaaba-door" d="M-6,3 L-3,4 L-3,10 L-6,9 Z" />
            <text x="18" y="-12">
              MAKKAH
            </text>
          </g>
        </g>

        {tooltip && (
          <g className="wfm-tooltip" transform={`translate(${Math.max(76, Math.min(WIDTH - 76, tooltip.x + 8))}, ${Math.max(44, tooltip.y - 12)})`} pointerEvents="none">
            <rect x="-72" y="-27" width="144" height="38" rx="7" />
            <text x="0" y="-11" className="wfm-tooltip-country">
              {tooltip.name}
            </text>
            <text x="0" y="3" className="wfm-tooltip-continent">
              {CONTINENTS.find((continent) => continent.code === tooltip.continent)?.name}
            </text>
          </g>
        )}
      </svg>

      <div className="wfm-legend" aria-label="Continents">
        {CONTINENTS.map((continent) => (
          <div
            className="wfm-legend-item"
            data-active={hoveredContinent === continent.code || undefined}
            data-dimmed={(hoveredContinent !== null && hoveredContinent !== continent.code) || undefined}
            key={continent.code}
          >
            <span className={`wfm-legend-dot wfm-legend-${continent.code.toLowerCase()}`} />
            <span>{continent.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
