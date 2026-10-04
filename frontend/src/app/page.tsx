'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type RadarFilter = 'all' | 'mideast' | 'atlantic' | 'pacific';
type ServiceCategory = 'flights' | 'hajj' | 'stays' | 'visa' | 'tours' | 'heli';

interface ContinentInfo {
  code: string;
  name: string;
  corridors: string;
  x: number;
  y: number;
}

export default function HomePage() {
  const router = useRouter();

  // Radar State
  const [radarFilter, setRadarFilter] = useState<RadarFilter>('all');
  const [tooltip, setTooltip] = useState<ContinentInfo | null>(null);

  // Search Console State
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('flights');
  const [origin, setOrigin] = useState('Dhaka (DAC)');
  const [destination, setDestination] = useState('JED');
  const [departureDate, setDepartureDate] = useState('2026-11-18');
  const [returnDate, setReturnDate] = useState('2026-12-04');
  const [fleetTier, setFleetTier] = useState('royal');
  const [directFlightsOnly, setDirectFlightsOnly] = useState(true);
  const [dedicatedCharter, setDedicatedCharter] = useState(true);
  const [expressVisa, setExpressVisa] = useState(true);
  const [armoredChauffeur, setArmoredChauffeur] = useState(false);

  // Handle Search Submission
  const handleDispatchSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    params.set('service', serviceCategory);
    params.set('from', origin);
    params.set('to', destination);
    params.set('depart', departureDate);
    if (returnDate) params.set('return', returnDate);
    params.set('tier', fleetTier);
    if (directFlightsOnly) params.set('direct', '1');
    if (dedicatedCharter) params.set('charter', '1');
    if (expressVisa) params.set('visa', '1');
    if (armoredChauffeur) params.set('chauffeur', '1');
    router.push(`/booking?${params.toString()}`);
  };

  // Quick book preset card
  const handlePresetBooking = (route: string, tier: string, service: string) => {
    const params = new URLSearchParams();
    params.set('to', route);
    params.set('tier', tier);
    params.set('service', service);
    router.push(`/booking?${params.toString()}`);
  };

  // Corridor active filter descriptions
  const getSectorLabel = () => {
    switch (radarFilter) {
      case 'mideast':
        return 'Middle East & Hajj Corridors (Makkah/Medina Royal)';
      case 'atlantic':
        return 'Trans-Atlantic Direct Airway (London / New York)';
      case 'pacific':
        return 'Asia-Pacific Leisure & Expedition Corridors (Tokyo / Bali)';
      default:
        return 'Global Sovereign Corridors (7 Active)';
    }
  };

  const getAirborneJets = () => {
    switch (radarFilter) {
      case 'mideast':
        return '5 Royal Jets';
      case 'atlantic':
        return '4 Falcon 8X';
      case 'pacific':
        return '5 Global 7500';
      default:
        return '14 Heavy Jets';
    }
  };

  return (
    <main className="w-full bg-[#071610] text-[#d4e7db] selection:bg-[#006838] selection:text-white">
      {/* 1. Telemetry Sub-Bar / Status Strip */}
      <div className="w-full bg-[#03110b] border-b border-white/5 px-6 lg:px-12 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#83d99d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#83d99d]"></span>
            </span>
            <span className="font-bold text-[11px] uppercase tracking-wider text-[#83d99d]">
              Live Radar Online
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[#bec9be]">
            <span className="text-white font-mono font-bold">DAC 23°46&apos;N 90°23&apos;E</span>
            <span className="text-white/30">/</span>
            <span>ICAO-DAC/VGHS Telemetry Stream</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[#bec9be]">
            <span>Sector Clearances:</span>
            <span className="font-semibold text-[#83d99d]">100% Diplomatic Granted</span>
          </div>
          <div className="h-3 w-[1px] bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-1.5 text-white bg-[#1d2d26] px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[13px] text-[#e9c349]">lock</span>
            <span>Biosecurity Enforced</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Flight Radar Console Canvas */}
      <div id="world-flight-radar" className="w-full bg-[#08140E] relative overflow-hidden px-4 lg:px-12 py-10">
        {/* Ambient emerald light gradient spot */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#006838]/20 blur-[140px] rounded-full"></div>
        <div className="pointer-events-none absolute top-[40%] -right-40 w-[600px] h-[600px] bg-[#006838]/10 blur-[130px] rounded-full"></div>

        <div className="max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
          {/* Radar Header: Filter corridors & HUD metrics */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#83d99d] animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#83d99d]">
                  Miller Projection Avionics Hub
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                World Flight Radar <span className="italic font-normal text-[#83d99d]">&amp; Sovereign Concierge</span>
              </h1>
              <p className="text-sm text-[#bec9be] max-w-2xl leading-relaxed">
                Real-time orbital tracking from primary flight hub Hazrat Shahjalal International (DAC) to sovereign diplomatic airways and luxury corridors.
              </p>
            </div>

            {/* Corridor View Selectors */}
            <div className="flex flex-wrap items-center gap-1 bg-[#0f1f18] p-1.5 rounded-xl border border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setRadarFilter('all')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  radarFilter === 'all'
                    ? 'bg-[#006838] text-white shadow-sm'
                    : 'text-[#bec9be] hover:text-white hover:bg-[#1d2d26]'
                }`}
              >
                Global View
              </button>
              <button
                type="button"
                onClick={() => setRadarFilter('mideast')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  radarFilter === 'mideast'
                    ? 'bg-[#006838] text-white shadow-sm'
                    : 'text-[#bec9be] hover:text-white hover:bg-[#1d2d26]'
                }`}
              >
                Middle East / Hajj
              </button>
              <button
                type="button"
                onClick={() => setRadarFilter('atlantic')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  radarFilter === 'atlantic'
                    ? 'bg-[#006838] text-white shadow-sm'
                    : 'text-[#bec9be] hover:text-white hover:bg-[#1d2d26]'
                }`}
              >
                Trans-Atlantic
              </button>
              <button
                type="button"
                onClick={() => setRadarFilter('pacific')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  radarFilter === 'pacific'
                    ? 'bg-[#006838] text-white shadow-sm'
                    : 'text-[#bec9be] hover:text-white hover:bg-[#1d2d26]'
                }`}
              >
                Asia-Pacific
              </button>
            </div>
          </div>

          {/* Interactive SVG Avionics Map & HUD Display Container */}
          <div className="relative w-full rounded-2xl bg-[#0E1E17] border border-white/10 shadow-2xl overflow-hidden">
            {/* Live HUD Telemetry Overlay (Top Left & Top Right) */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 bg-[#152B21]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#83d99d] text-[18px]">radar</span>
                <span className="text-[11px] font-bold uppercase text-white tracking-widest">
                  Active Air Track
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#bec9be]">
                <span>Fleet in Air:</span>
                <span className="text-white font-semibold text-right">{getAirborneJets()}</span>
                <span>Avg Ground Speed:</span>
                <span className="text-white font-semibold text-right">Mach 0.88</span>
                <span>Primary Dispatch:</span>
                <span className="text-[#83d99d] font-semibold text-right">DAC / Sovereign</span>
              </div>
            </div>

            <div className="absolute top-4 right-4 z-20 hidden md:flex flex-col items-end gap-1 bg-[#152B21]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase text-[#bec9be]">Sat-Link Quality</span>
                <span className="w-2 h-2 rounded-full bg-[#1B9A5B]"></span>
              </div>
              <div className="text-sm font-bold text-white font-mono">99.98% UTC Sync</div>
              <div className="text-[10px] uppercase font-bold text-[#e9c349]">
                FLIGHT RADAR PROTOCOL MIL-STD
              </div>
            </div>

            {/* SVG Flight Radar Map Canvas */}
            <div className="w-full relative aspect-[1000/480] select-none bg-[#03110b]">
              <svg
                className="w-full h-full block"
                viewBox="0 0 1000 480"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Radar sweep radial gradient */}
                  <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#83d99d" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#006838" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#006838" stopOpacity="0" />
                  </radialGradient>

                  {/* Route Pulse Gradients */}
                  <linearGradient id="emeraldTrailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#83d99d" stopOpacity="0" />
                    <stop offset="70%" stopColor="#83d99d" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                  </linearGradient>

                  <linearGradient id="goldHajjTrailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e9c349" stopOpacity="0" />
                    <stop offset="70%" stopColor="#ffe088" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                  </linearGradient>

                  {/* Aircraft Marker Symbol */}
                  <g id="jetIcon">
                    <path
                      d="M0,-6 L3,0 L9,2 L9,4 L3,3 L2,7 L4,9 L4,10 L0,9 L-4,10 L-4,9 L-2,7 L-3,3 L-9,4 L-9,2 L-3,0 Z"
                      fill="#FFFFFF"
                      stroke="#006838"
                      strokeWidth="0.8"
                    />
                  </g>
                  <g id="goldJetIcon">
                    <path
                      d="M0,-6 L3,0 L9,2 L9,4 L3,3 L2,7 L4,9 L4,10 L0,9 L-4,10 L-4,9 L-2,7 L-3,3 L-9,4 L-9,2 L-3,0 Z"
                      fill="#ffe088"
                      stroke="#574500"
                      strokeWidth="0.8"
                    />
                  </g>
                </defs>

                {/* Coordinate Grid (Miller Projection aesthetics) */}
                <g stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="3,4" strokeWidth="0.75">
                  <line x1="0" y1="60" x2="1000" y2="60" />
                  <line x1="0" y1="120" x2="1000" y2="120" />
                  <line x1="0" y1="180" x2="1000" y2="180" />
                  <line x1="0" y1="240" x2="1000" y2="240" />
                  <line x1="0" y1="300" x2="1000" y2="300" />
                  <line x1="0" y1="360" x2="1000" y2="360" />
                  <line x1="0" y1="420" x2="1000" y2="420" />
                  <line x1="125" y1="0" x2="125" y2="480" />
                  <line x1="250" y1="0" x2="250" y2="480" />
                  <line x1="375" y1="0" x2="375" y2="480" />
                  <line x1="500" y1="0" x2="500" y2="480" />
                  <line x1="625" y1="0" x2="625" y2="480" />
                  <line x1="750" y1="0" x2="750" y2="480" />
                  <line x1="875" y1="0" x2="875" y2="480" />
                </g>

                {/* Pre-rendered Continental Landmass Polygons */}
                <g
                  fill="#13231c"
                  stroke="rgba(131, 217, 157, 0.15)"
                  strokeWidth="0.8"
                  className="cursor-pointer"
                >
                  {/* North America */}
                  <path
                    d="M 80,45 L 140,35 L 210,38 L 245,60 L 260,110 L 230,135 L 245,175 L 225,200 L 195,215 L 175,250 L 155,240 L 145,185 L 105,150 L 80,120 L 70,80 Z"
                    className="hover:fill-[#006838]/40 transition-colors"
                    onMouseEnter={() => setTooltip({ name: 'North America Airspace', code: 'NA', corridors: '9 Flights', x: 190, y: 140 })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {/* Greenland */}
                  <path
                    d="M 310,25 L 360,30 L 375,65 L 340,95 L 315,80 Z"
                    className="hover:fill-[#006838]/40 transition-colors"
                    onMouseEnter={() => setTooltip({ name: 'Greenland Polar Corridor', code: 'GL', corridors: '3 Flights', x: 345, y: 65 })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {/* South America */}
                  <path
                    d="M 235,260 L 285,275 L 330,320 L 320,380 L 280,440 L 255,465 L 245,430 L 235,360 L 215,300 Z"
                    className="hover:fill-[#006838]/40 transition-colors"
                    onMouseEnter={() => setTooltip({ name: 'South America Corridor', code: 'SA', corridors: '5 Flights', x: 275, y: 350 })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {/* Europe & UK */}
                  <path
                    d="M 450,90 L 485,75 L 530,85 L 545,130 L 515,165 L 480,175 L 455,160 L 440,120 Z M 445,100 L 465,95 L 460,125 L 440,115 Z"
                    className="hover:fill-[#006838]/40 transition-colors"
                    onMouseEnter={() => setTooltip({ name: 'European Sovereign Skies', code: 'EU', corridors: '14 Flights', x: 485, y: 125 })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {/* Africa */}
                  <path
                    d="M 450,185 L 525,180 L 565,235 L 575,290 L 540,375 L 505,405 L 475,370 L 445,285 L 435,220 Z"
                    className="hover:fill-[#006838]/40 transition-colors"
                    onMouseEnter={() => setTooltip({ name: 'African Trans-Continental', code: 'AF', corridors: '8 Flights', x: 505, y: 285 })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {/* Asia (including Middle East & Central Asia) */}
                  <path
                    d="M 540,80 L 640,65 L 755,75 L 840,110 L 825,180 L 795,215 L 735,230 L 725,285 L 685,275 L 645,220 L 590,210 L 565,160 L 550,120 Z"
                    className="hover:fill-[#006838]/50 transition-colors"
                    onMouseEnter={() => setTooltip({ name: 'Middle East & Central Asia', code: 'ME-CA', corridors: '22 Flights', x: 670, y: 150 })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {/* Japan */}
                  <path
                    d="M 835,160 L 855,155 L 865,185 L 845,200 Z"
                    className="hover:fill-[#006838]/40 transition-colors"
                    onMouseEnter={() => setTooltip({ name: 'East Asia & Japan', code: 'EA', corridors: '11 Flights', x: 850, y: 180 })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {/* Southeast Asia Archipelago */}
                  <path
                    d="M 720,250 L 750,265 L 775,295 L 755,310 L 725,285 Z M 740,320 L 790,325 L 810,345 L 760,345 Z"
                    className="hover:fill-[#006838]/40 transition-colors"
                    onMouseEnter={() => setTooltip({ name: 'Southeast Asia / Sunda', code: 'SEA', corridors: '16 Flights', x: 760, y: 295 })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {/* Australia & Oceania */}
                  <path
                    d="M 780,360 L 870,350 L 890,405 L 860,445 L 790,430 L 765,390 Z M 900,420 L 920,415 L 910,450 Z"
                    className="hover:fill-[#006838]/40 transition-colors"
                    onMouseEnter={() => setTooltip({ name: 'Oceania Air Corridor', code: 'OC', corridors: '7 Flights', x: 830, y: 400 })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                </g>

                {/* Coordinate Hub: Dhaka (DAC) ~ 708, 208 */}
                <g id="dhaka-hub">
                  <circle cx="708" cy="208" fill="none" r="38" stroke="#006838" strokeOpacity="0.3" strokeWidth="1">
                    <animate attributeName="r" dur="3s" repeatCount="indefinite" values="6;48" />
                    <animate attributeName="stroke-opacity" dur="3s" repeatCount="indefinite" values="0.8;0" />
                  </circle>
                  <circle cx="708" cy="208" fill="none" r="22" stroke="#83d99d" strokeOpacity="0.5" strokeWidth="1.2">
                    <animate attributeName="r" begin="1s" dur="3s" repeatCount="indefinite" values="4;32" />
                    <animate attributeName="stroke-opacity" begin="1s" dur="3s" repeatCount="indefinite" values="0.9;0" />
                  </circle>
                  <circle cx="708" cy="208" fill="url(#hubGlow)" r="9" />
                  <circle cx="708" cy="208" fill="#FFFFFF" r="3.5" stroke="#006838" strokeWidth="1.5" />

                  {/* DAC Hub Label */}
                  <rect x="643" y="180" width="130" height="18" rx="9" fill="#03110b" stroke="#83d99d" strokeWidth="0.8" opacity="0.95" />
                  <text x="708" y="192" fill="#9ef5b8" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">
                    DAC • SHOMAKAL BASE
                  </text>
                </g>

                {/* Flight Arcs Definition Group */}
                <g id="flight-corridors">
                  {/* 1. DAC -> DXB/JED (Middle East / Hajj) */}
                  {(radarFilter === 'all' || radarFilter === 'mideast') && (
                    <g>
                      <path d="M 708,208 Q 644,165 580,195" fill="none" id="path-dac-dxb" opacity="0.4" stroke="#e9c349" strokeDasharray="3,3" strokeWidth="1" />
                      <path d="M 708,208 Q 644,165 580,195" fill="none" pathLength="1" stroke="url(#goldHajjTrailGrad)" strokeDasharray="0.25 0.75" strokeLinecap="round" strokeWidth="2.4">
                        <animate attributeName="stroke-dashoffset" dur="4.2s" from="1" to="-1" repeatCount="indefinite" />
                      </path>
                      <use href="#goldJetIcon">
                        <animateMotion dur="4.2s" path="M 708,208 Q 644,165 580,195" repeatCount="indefinite" rotate="auto" />
                      </use>
                    </g>
                  )}

                  {/* 2. DAC -> LHR (Trans-Atlantic) */}
                  {(radarFilter === 'all' || radarFilter === 'atlantic') && (
                    <g>
                      <path d="M 708,208 Q 570,90 475,108" fill="none" id="path-dac-lhr" opacity="0.3" stroke="#83d99d" strokeDasharray="3,3" strokeWidth="1" />
                      <path d="M 708,208 Q 570,90 475,108" fill="none" pathLength="1" stroke="url(#emeraldTrailGrad)" strokeDasharray="0.3 0.7" strokeLinecap="round" strokeWidth="2">
                        <animate attributeName="stroke-dashoffset" dur="6.5s" from="1" to="-1" repeatCount="indefinite" />
                      </path>
                      <use href="#jetIcon">
                        <animateMotion dur="6.5s" path="M 708,208 Q 570,90 475,108" repeatCount="indefinite" rotate="auto" />
                      </use>
                    </g>
                  )}

                  {/* 3. DAC -> JFK (Trans-Atlantic) */}
                  {(radarFilter === 'all' || radarFilter === 'atlantic') && (
                    <g>
                      <path d="M 708,208 Q 430,10 250,125" fill="none" id="path-dac-jfk" opacity="0.25" stroke="#83d99d" strokeDasharray="3,3" strokeWidth="1" />
                      <path d="M 708,208 Q 430,10 250,125" fill="none" pathLength="1" stroke="url(#emeraldTrailGrad)" strokeDasharray="0.22 0.78" strokeLinecap="round" strokeWidth="2.2">
                        <animate attributeName="stroke-dashoffset" dur="9.2s" from="1" to="-1" repeatCount="indefinite" />
                      </path>
                      <use href="#jetIcon">
                        <animateMotion dur="9.2s" path="M 708,208 Q 430,10 250,125" repeatCount="indefinite" rotate="auto" />
                      </use>
                    </g>
                  )}

                  {/* 4. DAC -> HND (Asia-Pacific) */}
                  {(radarFilter === 'all' || radarFilter === 'pacific') && (
                    <g>
                      <path d="M 708,208 Q 790,145 855,150" fill="none" id="path-dac-hnd" opacity="0.3" stroke="#83d99d" strokeDasharray="3,3" strokeWidth="1" />
                      <path d="M 708,208 Q 790,145 855,150" fill="none" pathLength="1" stroke="url(#emeraldTrailGrad)" strokeDasharray="0.3 0.7" strokeLinecap="round" strokeWidth="2">
                        <animate attributeName="stroke-dashoffset" dur="5.1s" from="1" to="-1" repeatCount="indefinite" />
                      </path>
                      <use href="#jetIcon">
                        <animateMotion dur="5.1s" path="M 708,208 Q 790,145 855,150" repeatCount="indefinite" rotate="auto" />
                      </use>
                    </g>
                  )}

                  {/* 5. DAC -> DPS (Asia-Pacific) */}
                  {(radarFilter === 'all' || radarFilter === 'pacific') && (
                    <g>
                      <path d="M 708,208 Q 770,230 795,295" fill="none" id="path-dac-dps" opacity="0.3" stroke="#83d99d" strokeDasharray="3,3" strokeWidth="1" />
                      <path d="M 708,208 Q 770,230 795,295" fill="none" pathLength="1" stroke="url(#emeraldTrailGrad)" strokeDasharray="0.32 0.68" strokeLinecap="round" strokeWidth="2">
                        <animate attributeName="stroke-dashoffset" dur="4.8s" from="1" to="-1" repeatCount="indefinite" />
                      </path>
                      <use href="#jetIcon">
                        <animateMotion dur="4.8s" path="M 708,208 Q 770,230 795,295" repeatCount="indefinite" rotate="auto" />
                      </use>
                    </g>
                  )}

                  {/* 6. DAC -> JNB (African Expedition) */}
                  {radarFilter === 'all' && (
                    <g>
                      <path d="M 708,208 Q 620,290 530,360" fill="none" id="path-dac-jnb" opacity="0.3" stroke="#83d99d" strokeDasharray="3,3" strokeWidth="1" />
                      <path d="M 708,208 Q 620,290 530,360" fill="none" pathLength="1" stroke="url(#emeraldTrailGrad)" strokeDasharray="0.25 0.75" strokeLinecap="round" strokeWidth="2">
                        <animate attributeName="stroke-dashoffset" dur="7.8s" from="1" to="-1" repeatCount="indefinite" />
                      </path>
                      <use href="#jetIcon">
                        <animateMotion dur="7.8s" path="M 708,208 Q 620,290 530,360" repeatCount="indefinite" rotate="auto" />
                      </use>
                    </g>
                  )}

                  {/* 7. DAC -> USH (Patagonia / Antarctic) */}
                  {radarFilter === 'all' && (
                    <g>
                      <path d="M 708,208 Q 480,430 275,445" fill="none" id="path-dac-ush" opacity="0.2" stroke="#83d99d" strokeDasharray="3,3" strokeWidth="1" />
                      <path d="M 708,208 Q 480,430 275,445" fill="none" pathLength="1" stroke="url(#emeraldTrailGrad)" strokeDasharray="0.2 0.8" strokeLinecap="round" strokeWidth="2">
                        <animate attributeName="stroke-dashoffset" dur="11.5s" from="1" to="-1" repeatCount="indefinite" />
                      </path>
                      <use href="#jetIcon">
                        <animateMotion dur="11.5s" path="M 708,208 Q 480,430 275,445" repeatCount="indefinite" rotate="auto" />
                      </use>
                    </g>
                  )}
                </g>

                {/* Waypoint Beacons & IATA Labels */}
                <g fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="8" fontWeight="700" id="waypoints">
                  {/* DXB (Dubai) */}
                  <g transform="translate(580, 195)">
                    <circle cx="0" cy="0" r="3.5" fill="#e9c349" stroke="#03110b" strokeWidth="1.2" />
                    <text x="7" y="3" fill="#ffe088">DXB • DUBAI / JED</text>
                  </g>
                  {/* LHR (London) */}
                  <g transform="translate(475, 108)">
                    <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" stroke="#006838" strokeWidth="1.2" />
                    <text x="7" y="3" fill="#FFFFFF">LHR • LONDON</text>
                  </g>
                  {/* JFK (New York) */}
                  <g transform="translate(250, 125)">
                    <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" stroke="#006838" strokeWidth="1.2" />
                    <text x="-65" y="3" fill="#FFFFFF">JFK • NEW YORK</text>
                  </g>
                  {/* HND (Tokyo) */}
                  <g transform="translate(855, 150)">
                    <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" stroke="#006838" strokeWidth="1.2" />
                    <text x="7" y="3" fill="#FFFFFF">HND • TOKYO</text>
                  </g>
                  {/* DPS (Bali) */}
                  <g transform="translate(795, 295)">
                    <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" stroke="#006838" strokeWidth="1.2" />
                    <text x="7" y="3" fill="#FFFFFF">DPS • BALI</text>
                  </g>
                  {/* JNB (Johannesburg) */}
                  <g transform="translate(530, 360)">
                    <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" stroke="#006838" strokeWidth="1.2" />
                    <text x="7" y="3" fill="#FFFFFF">JNB • SOUTH AFRICA</text>
                  </g>
                  {/* USH (Ushuaia) */}
                  <g transform="translate(275, 445)">
                    <circle cx="0" cy="0" r="3.5" fill="#83d99d" stroke="#03110b" strokeWidth="1.2" />
                    <text x="8" y="3" fill="#83d99d">USH • PATAGONIA</text>
                  </g>
                </g>

                {/* Dynamic Map Tooltip */}
                {tooltip && (
                  <g transform={`translate(${tooltip.x}, ${tooltip.y})`} pointerEvents="none">
                    <rect x="-65" y="-34" width="130" height="30" rx="6" fill="#071610" stroke="#83d99d" strokeWidth="1" opacity="0.95" />
                    <text x="0" y="-20" textAnchor="middle" fill="#FFFFFF" fontFamily="'Playfair Display', serif" fontSize="9" fontWeight="600">
                      {tooltip.name}
                    </text>
                    <text x="0" y="-8" textAnchor="middle" fill="#83d99d" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="7.5" fontWeight="700" letterSpacing="0.05em">
                      {tooltip.code} • {tooltip.corridors.toUpperCase()}
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Telemetry bottom data ribbon */}
            <div className="w-full bg-[#152B21] px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#006838]"></span>
                  <span className="text-[#bec9be]">Selected Sector:</span>
                  <span className="text-white font-semibold">{getSectorLabel()}</span>
                </div>
                <div className="hidden lg:flex items-center gap-2 text-[#bec9be]">
                  <span>Weather Vector:</span>
                  <span className="text-[#83d99d] font-mono">ENROUTE CLEAR • JETSTREAM 110KTS</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#bec9be]">ICAO Class-A Clear:</span>
                <span className="bg-[#83d99d]/15 text-[#83d99d] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  VIP AVIATION PASS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Comprehensive Concierge Search Console */}
      <div className="w-full bg-[#071610] py-10 px-4 lg:px-12 relative -mt-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="w-full bg-[#13231c] border border-white/10 rounded-2xl shadow-2xl p-6 lg:p-8 flex flex-col gap-6 relative">
            {/* Category Selection Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setServiceCategory('flights')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 shrink-0 transition-all ${
                  serviceCategory === 'flights'
                    ? 'bg-[#83d99d] text-[#00391c] shadow-md'
                    : 'bg-[#1d2d26] text-[#d4e7db] hover:text-white hover:bg-[#2c3d35]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">flight_takeoff</span>
                <span>Flights &amp; Private Charters</span>
              </button>
              <button
                type="button"
                onClick={() => setServiceCategory('hajj')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 shrink-0 transition-all ${
                  serviceCategory === 'hajj'
                    ? 'bg-[#83d99d] text-[#00391c] shadow-md'
                    : 'bg-[#1d2d26] text-[#d4e7db] hover:text-white hover:bg-[#2c3d35]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-[#e9c349]">mosque</span>
                <span>Hajj &amp; Umrah Royal Steps</span>
              </button>
              <button
                type="button"
                onClick={() => setServiceCategory('stays')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 shrink-0 transition-all ${
                  serviceCategory === 'stays'
                    ? 'bg-[#83d99d] text-[#00391c] shadow-md'
                    : 'bg-[#1d2d26] text-[#d4e7db] hover:text-white hover:bg-[#2c3d35]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">hotel</span>
                <span>Curated Luxury Stays</span>
              </button>
              <button
                type="button"
                onClick={() => setServiceCategory('visa')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 shrink-0 transition-all ${
                  serviceCategory === 'visa'
                    ? 'bg-[#83d99d] text-[#00391c] shadow-md'
                    : 'bg-[#1d2d26] text-[#d4e7db] hover:text-white hover:bg-[#2c3d35]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">badge</span>
                <span>Diplomatic Visa Clearance</span>
              </button>
              <button
                type="button"
                onClick={() => setServiceCategory('tours')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 shrink-0 transition-all ${
                  serviceCategory === 'tours'
                    ? 'bg-[#83d99d] text-[#00391c] shadow-md'
                    : 'bg-[#1d2d26] text-[#d4e7db] hover:text-white hover:bg-[#2c3d35]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">explore</span>
                <span>Bespoke Expeditions</span>
              </button>
              <button
                type="button"
                onClick={() => setServiceCategory('heli')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-2 shrink-0 transition-all ${
                  serviceCategory === 'heli'
                    ? 'bg-[#83d99d] text-[#00391c] shadow-md'
                    : 'bg-[#1d2d26] text-[#d4e7db] hover:text-white hover:bg-[#2c3d35]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">mode_fan</span>
                <span>Heli-Transfers</span>
              </button>
            </div>

            {/* Form Inset Grid */}
            <form onSubmit={handleDispatchSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Field 1: Departure Hub */}
              <div className="bg-[#03110b] p-3.5 rounded-xl border border-white/5 flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-[#83d99d] tracking-wider flex items-center justify-between">
                  <span>Origin Departure Hub</span>
                  <button
                    type="button"
                    onClick={() => {
                      const temp = origin;
                      setOrigin(destination === 'JED' ? 'Jeddah (JED)' : destination);
                      setDestination(temp.includes('DAC') ? 'DAC' : 'JED');
                    }}
                    className="text-[#83d99d] hover:text-white transition-colors"
                    title="Swap route"
                  >
                    <span className="material-symbols-outlined text-[14px]">sync_alt</span>
                  </button>
                </label>
                <div className="flex items-center gap-2 pt-1">
                  <span className="material-symbols-outlined text-[#83d99d] text-[20px]">location_on</span>
                  <div className="flex flex-col flex-1">
                    <span className="font-display text-base font-semibold text-white leading-tight">
                      {origin}
                    </span>
                    <span className="text-xs text-[#bec9be] truncate">
                      Shahjalal Int&apos;l • Terminal VIP VIP-1
                    </span>
                  </div>
                </div>
              </div>

              {/* Field 2: Destination Corridor */}
              <div className="bg-[#03110b] p-3.5 rounded-xl border border-white/5 flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-[#83d99d] tracking-wider flex items-center justify-between">
                  <span>Destination Corridor</span>
                  <span className="text-[#e9c349] font-normal">Slot Priority</span>
                </label>
                <div className="flex items-center gap-2 pt-1">
                  <span className="material-symbols-outlined text-[#e9c349] text-[20px]">flight_land</span>
                  <div className="flex flex-col flex-1">
                    <select
                      className="bg-transparent text-white font-display text-base font-semibold leading-tight focus:outline-none cursor-pointer"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    >
                      <option className="bg-[#1d2d26] text-white" value="JED">JED • Jeddah (VIP Royal)</option>
                      <option className="bg-[#1d2d26] text-white" value="DXB">DXB • Dubai Al Maktoum</option>
                      <option className="bg-[#1d2d26] text-white" value="JTR">JTR • Santorini Wings</option>
                      <option className="bg-[#1d2d26] text-white" value="DPS">DPS • Bali Sanctuary</option>
                      <option className="bg-[#1d2d26] text-white" value="ZRH">ZRH • Zurich Alpine Private</option>
                      <option className="bg-[#1d2d26] text-white" value="LHR">LHR • London (FAB) Jet</option>
                    </select>
                    <span className="text-xs text-[#bec9be]">Expedited Ramp Access</span>
                  </div>
                </div>
              </div>

              {/* Field 3: Dates & Window */}
              <div className="bg-[#03110b] p-3.5 rounded-xl border border-white/5 flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-[#83d99d] tracking-wider flex items-center justify-between">
                  <span>Corridor Window</span>
                  <span className="text-white/40 font-normal">Flexible Slot</span>
                </label>
                <div className="flex items-center gap-2 pt-1">
                  <span className="material-symbols-outlined text-[#83d99d] text-[20px]">calendar_today</span>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="bg-transparent text-white text-xs font-semibold leading-tight focus:outline-none cursor-pointer [color-scheme:dark]"
                      />
                      <span className="text-white/40 text-xs">→</span>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="bg-transparent text-white text-xs font-semibold leading-tight focus:outline-none cursor-pointer [color-scheme:dark]"
                      />
                    </div>
                    <span className="text-xs text-[#bec9be]">Direct Flight Corridor Window</span>
                  </div>
                </div>
              </div>

              {/* Field 4: Fleet Class / Tier */}
              <div className="bg-[#03110b] p-3.5 rounded-xl border border-white/5 flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-[#83d99d] tracking-wider flex items-center justify-between">
                  <span>Service Tier / Fleet</span>
                  <span className="text-[#83d99d] font-normal">G650ER / Heavy</span>
                </label>
                <div className="flex items-center gap-2 pt-1">
                  <span className="material-symbols-outlined text-[#83d99d] text-[20px]">airline_seat_recline_extra</span>
                  <div className="flex flex-col flex-1">
                    <select
                      className="bg-transparent text-white font-display text-base font-semibold leading-tight focus:outline-none cursor-pointer"
                      value={fleetTier}
                      onChange={(e) => setFleetTier(e.target.value)}
                    >
                      <option className="bg-[#1d2d26] text-white" value="royal">Royal Ultra-Long Range</option>
                      <option className="bg-[#1d2d26] text-white" value="heavy">Heavy Jet (14-16 Pax)</option>
                      <option className="bg-[#1d2d26] text-white" value="first">Commercial Diplomatic First</option>
                      <option className="bg-[#1d2d26] text-white" value="heli">Twin-Engine Sikorsky Heli</option>
                    </select>
                    <span className="text-xs text-[#bec9be]">Private Stateroom • Chef Enroute</span>
                  </div>
                </div>
              </div>
            </form>

            {/* Filter Speed Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">Priority Accords:</span>
                <label className="flex items-center gap-2 bg-[#03110b] px-3 py-1.5 rounded-lg cursor-pointer border border-white/5 hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={directFlightsOnly}
                    onChange={(e) => setDirectFlightsOnly(e.target.checked)}
                    className="accent-[#006838] w-4 h-4 rounded"
                  />
                  <span className="text-xs font-semibold text-[#d4e7db]">Direct Flight Paths</span>
                </label>
                <label className="flex items-center gap-2 bg-[#03110b] px-3 py-1.5 rounded-lg cursor-pointer border border-white/5 hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={dedicatedCharter}
                    onChange={(e) => setDedicatedCharter(e.target.checked)}
                    className="accent-[#006838] w-4 h-4 rounded"
                  />
                  <span className="text-xs font-semibold text-[#d4e7db]">Dedicated Charter</span>
                </label>
                <label className="flex items-center gap-2 bg-[#03110b] px-3 py-1.5 rounded-lg cursor-pointer border border-white/5 hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={expressVisa}
                    onChange={(e) => setExpressVisa(e.target.checked)}
                    className="accent-[#006838] w-4 h-4 rounded"
                  />
                  <span className="text-xs font-semibold text-[#d4e7db]">Express Sovereign Visa</span>
                </label>
                <label className="flex items-center gap-2 bg-[#03110b] px-3 py-1.5 rounded-lg cursor-pointer border border-white/5 hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={armoredChauffeur}
                    onChange={(e) => setArmoredChauffeur(e.target.checked)}
                    className="accent-[#006838] w-4 h-4 rounded"
                  />
                  <span className="text-xs font-semibold text-[#d4e7db]">Armored Chauffeur</span>
                </label>
              </div>

              {/* Direct Concierge Contact Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href="tel:+8801900000000"
                  className="flex items-center gap-2 bg-[#1d2d26] hover:bg-[#2c3d35] px-3.5 py-2 rounded-xl text-[#d4e7db] transition-colors border border-white/10"
                >
                  <span className="material-symbols-outlined text-[#83d99d] text-[20px]">phone_in_talk</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] uppercase font-bold text-[#83d99d]">Dhaka Desk Hotline</span>
                    <span className="text-xs font-bold text-white">+880 (2) 983-4001</span>
                  </div>
                </a>
                <a
                  href="https://wa.me/8801700000000"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 px-3.5 py-2 rounded-xl text-[#25D366] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span className="text-xs font-bold">24/7 WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Primary Dispatch Action Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleDispatchSearch}
                className="w-full py-4 rounded-xl bg-[#006838] hover:bg-[#0B6E3F] text-white font-display text-lg font-semibold tracking-wide shadow-[0_12px_28px_rgba(0,104,56,0.4)] hover:shadow-[0_16px_36px_rgba(0,104,56,0.6)] flex items-center justify-center gap-3 transition-all duration-200 transform active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[24px]">travel_explore</span>
                <span>Search Corridors &amp; Dispatch Charters</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Curated Master Corridors & Signature Expeditions Grid */}
      <div className="w-full bg-[#0E1E17] py-16 px-4 lg:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-0.5 bg-[#83d99d]"></span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#83d99d]">
                  Autumn / Winter Signature Allocations
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Curated Master Corridors
              </h2>
            </div>
            <p className="text-sm text-[#bec9be] max-w-md leading-relaxed">
              Pre-negotiated sovereign flight clearances, apron VIP transfers, and Presidential suite entitlements ready for immediate dispatch.
            </p>
          </div>

          {/* 3 Signature Expedition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: VIP Umrah Horizon */}
            <div className="bg-[#0f1f18] rounded-2xl overflow-hidden border border-white/10 shadow-xl flex flex-col group hover:shadow-2xl hover:border-[#83d99d]/30 transition-all duration-300">
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Holy Kaaba Makkah illuminated at night"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhFQ2LuC0SVHEZX5XtsYtnWYZMCoOih12zXJGGQm_JcsDnjtjrR17w7l67o8eM7pp74b12ObGImCICME-UtsuhcVLdUtzWo2Y-rRtq7t2FP_blcRZwZScguyGv36zzNPl-IKBIU-bEQiNjVLHNnjoufE1si4fwPgcqTssLs-djSMThC1Tof1icePUh29z3AcZRLg0E5tg79oC_E1Auu8I1LbntL8ncztP3A5lMsQ4Utvhwy7R4Nd_N"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f18] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-[#03110b]/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-[#e9c349] tracking-wider uppercase border border-white/10">
                  <span className="material-symbols-outlined text-[13px]">star</span>
                  <span>ROYAL HAJJ &amp; UMRAH</span>
                </div>
                <div className="absolute bottom-3 right-3 text-lg font-bold text-white bg-[#152B21]/95 px-3 py-1 rounded-lg border border-white/10">
                  $8,900 <span className="text-xs text-[#bec9be] font-normal">/ pax</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#83d99d] tracking-wider mb-1">
                    <span>DAC • DXB • JED • MED</span>
                    <span>• Non-Stop Apron</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white group-hover:text-[#83d99d] transition-colors">
                    VIP Umrah Horizon
                  </h3>
                  <p className="text-xs text-[#bec9be] mt-2 leading-relaxed">
                    Privileged direct apron transfer in Jeddah, private Haram-facing suite at Raffles Makkah, dedicated Mutawwif scholar, and executive jet shuttle to Madinah.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-[#d4e7db] font-semibold">Gulfstream G650ER Slot</span>
                  <button
                    type="button"
                    onClick={() => handlePresetBooking('JED', 'royal', 'hajj')}
                    className="px-4 py-2 rounded-xl bg-[#1d2d26] hover:bg-[#006838] text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>Reserve Wing</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Cycladic Aegean Wings */}
            <div className="bg-[#0f1f18] rounded-2xl overflow-hidden border border-white/10 shadow-xl flex flex-col group hover:shadow-2xl hover:border-[#83d99d]/30 transition-all duration-300">
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Santorini cliffside estate over deep azure Aegean caldera"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLut4XNpi8OpE09nXAGVwe343Rx3vcb8lwY5jJEg4sRNKVmqWmJ88j_M4CG6Wd9sZk9opy3unfhXyXRwPFxw_Quylm7sbecUKSZqYsYsm67VBph0l4h7D9A8XQH4b_EdKc9kVljI4ZwVfFQJ4RshQom_TC2TW09IioCn8Hj-6oQMxC0CEGwvjgOZuqlCyYaJPjmGoN6uIlkKoTba2eBbz87VaxK_-j7xnTwbEoMwrR-eiigCPn-PeD"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f18] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-[#03110b]/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-[#83d99d] tracking-wider uppercase border border-white/10">
                  <span className="material-symbols-outlined text-[13px]">flight</span>
                  <span>MEDITERRANEAN CORRIDOR</span>
                </div>
                <div className="absolute bottom-3 right-3 text-lg font-bold text-white bg-[#152B21]/95 px-3 py-1 rounded-lg border border-white/10">
                  $12,400 <span className="text-xs text-[#bec9be] font-normal">/ pax</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#83d99d] tracking-wider mb-1">
                    <span>DAC • ATH • JTR</span>
                    <span>• Island Hop</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white group-hover:text-[#83d99d] transition-colors">
                    Cycladic Aegean Wings
                  </h3>
                  <p className="text-xs text-[#bec9be] mt-2 leading-relaxed">
                    Heavy jet charter to Athens with direct Sikorsky chopper transfer to Oia clifftop private sanctuary. Includes private 90ft yacht charter around Delos.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-[#d4e7db] font-semibold">Bombardier Global 7500</span>
                  <button
                    type="button"
                    onClick={() => handlePresetBooking('JTR', 'heavy', 'flights')}
                    className="px-4 py-2 rounded-xl bg-[#1d2d26] hover:bg-[#006838] text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>Reserve Wing</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Patagonian Ice Field Traverse */}
            <div className="bg-[#0f1f18] rounded-2xl overflow-hidden border border-white/10 shadow-xl flex flex-col group hover:shadow-2xl hover:border-[#83d99d]/30 transition-all duration-300">
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Expedition lodge and private exploration aircraft in Patagonia"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYamMR4uC03v3imuMKSY9l2h6UsnzEAuEdDWxeuHyxgMq2bqiOJ7Rkp7TN2fcpzz_VNyeW1VzT8HGjz1pRBjcth1LowPpFUK6YxP9J1cTqYvUAwXFghOFvZ7Bi5z6ioSBAZEKLovHWbgeA_6RTjAwEccpTjAai2NhsIF4jrNGoFxJEqMg2lQS8kSsXqv97g4h0K98SWz639WsnAseBDInvSQTGeFnOXktgXp8rYEi5d798ZnvaDKZn"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f18] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-[#03110b]/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-[#e9c349] tracking-wider uppercase border border-white/10">
                  <span className="material-symbols-outlined text-[13px]">snowboarding</span>
                  <span>POLAR EXPEDITION</span>
                </div>
                <div className="absolute bottom-3 right-3 text-lg font-bold text-white bg-[#152B21]/95 px-3 py-1 rounded-lg border border-white/10">
                  $14,800 <span className="text-xs text-[#bec9be] font-normal">/ pax</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#83d99d] tracking-wider mb-1">
                    <span>DAC • EZE • USH</span>
                    <span>• Antarctic Edge</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white group-hover:text-[#83d99d] transition-colors">
                    Patagonian Ice Field
                  </h3>
                  <p className="text-xs text-[#bec9be] mt-2 leading-relaxed">
                    Ultra-long haul clearance into Ushuaia. Stay at luxury glacier geo-domes, private ski-plane access to southern icecaps, and polar wildlife flyovers.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-[#d4e7db] font-semibold">Dassault Falcon 8X</span>
                  <button
                    type="button"
                    onClick={() => handlePresetBooking('USH', 'royal', 'tours')}
                    className="px-4 py-2 rounded-xl bg-[#1d2d26] hover:bg-[#006838] text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>Reserve Wing</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges & Consular Assurances */}
          <div className="w-full bg-[#03110b] border border-white/5 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#006838]/20 border border-[#83d99d]/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#83d99d] text-[26px]">verified</span>
              </div>
              <div>
                <span className="text-sm font-bold text-white block">ICAO Biosecurity Protocol</span>
                <span className="text-xs text-[#bec9be]">Full HEPA clean air certification and onboard medical quarantine clearance.</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#006838]/20 border border-[#83d99d]/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#83d99d] text-[26px]">shield</span>
              </div>
              <div>
                <span className="text-sm font-bold text-white block">100% Diplomatic Overflight</span>
                <span className="text-xs text-[#bec9be]">Unrestricted airspace over sovereign nations with zero commercial delays.</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#006838]/20 border border-[#83d99d]/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#83d99d] text-[26px]">support_agent</span>
              </div>
              <div>
                <span className="text-sm font-bold text-white block">Direct Flight Dispatcher</span>
                <span className="text-xs text-[#bec9be]">Senior pilot and consular attache assigned to your itinerary 24/7.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. VIP Dispatch Newsletter & Priority Manifest */}
      <div className="w-full bg-[#08140E] py-16 px-4 lg:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#13231c] border border-white/10 p-8 sm:p-12 relative overflow-hidden flex flex-col items-center text-center">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#006838]/20 via-transparent to-transparent"></div>
          <span className="material-symbols-outlined text-[#83d99d] text-[48px] mb-4">rocket_launch</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Begin Your Sacred Journey
          </h2>
          <p className="text-sm text-[#bec9be] max-w-xl mb-8 leading-relaxed">
            Subscribe for exclusive Hajj/Umrah royal packages, private aviation slots, early-bird tour deals, and members-only travel dispatch manifests from Shomakal Aviation.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md relative z-10"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to Shomakal VIP Telemetry!');
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your VIP email address"
              className="flex-1 bg-[#03110b] border border-white/15 px-5 py-3.5 rounded-full text-xs text-white placeholder:text-white/40 outline-none focus:border-[#83d99d] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#006838] hover:bg-[#0B6E3F] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-lg shadow-[#006838]/30"
            >
              Join Manifest
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
