'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logoImg from '@/images/shomakal_logo.jpeg';

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="w-full bg-[#08140E] border-t border-white/10 text-on-surface-variant pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logoImg}
                alt="Shomakal Air Service"
                width={36}
                height={36}
                className="rounded-lg object-contain w-8 h-8"
              />
              <div className="flex flex-col">
                <span className="font-display text-xl text-white font-bold leading-tight">Shomakal Air Service</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#83d99d]">Sovereign Air Passage</span>
              </div>
            </Link>
            <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed mt-1">
              Pinnacle private aviation, transcontinental diplomatic clearance, and bespoke expedition logistics operating under stringent ICAO biosecurity protocols.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#83d99d] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006838]"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#83d99d]">
                Global Operations Desk Active • 24/7 UTC
              </span>
            </div>
          </div>

          {/* Global Telemetry */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase font-bold tracking-widest text-white">Global Telemetry</span>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link className="hover:text-[#83d99d] transition-colors" href="/#world-flight-radar">Air Corridor Matrix</Link></li>
              <li><Link className="hover:text-[#83d99d] transition-colors" href="/flights">Slot Manifests</Link></li>
              <li><Link className="hover:text-[#83d99d] transition-colors" href="/flights">Heavy Jet Fleet</Link></li>
              <li><Link className="hover:text-[#83d99d] transition-colors" href="/visa">Overflight Diplomatic Permits</Link></li>
            </ul>
          </div>

          {/* Expedition Lines */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase font-bold tracking-widest text-white">Expedition Lines</span>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link className="hover:text-[#83d99d] transition-colors" href="/tours">VIP Hajj &amp; Umrah Royal</Link></li>
              <li><Link className="hover:text-[#83d99d] transition-colors" href="/hotels">Alpine Sanctuary Lodges</Link></li>
              <li><Link className="hover:text-[#83d99d] transition-colors" href="/destinations">Ancient Silk Air Routes</Link></li>
              <li><Link className="hover:text-[#83d99d] transition-colors" href="/blog">Chief Aviator Dispatches</Link></li>
            </ul>
          </div>

          {/* Consular & Safety */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase font-bold tracking-widest text-white">Consular &amp; Safety</span>
            <ul className="flex flex-col gap-2 text-xs text-on-surface">
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#83d99d]"></span> ICAO Certified Fleet</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#83d99d]"></span> Class-A Clean Cabin Air</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#83d99d]"></span> Dhaka (DAC) • London (FAB)</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#83d99d]"></span> Dubai (DWC) • Geneva (GVA)</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-outline">
          <p>© {new Date().getFullYear()} Shomakal Air Service Ltd. All sovereign rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link className="hover:text-[#83d99d] transition-colors" href="/terms">Biosecurity Mandates</Link>
            <Link className="hover:text-[#83d99d] transition-colors" href="/privacy">Avionics Privacy Policy</Link>
            <Link className="hover:text-[#83d99d] transition-colors" href="/terms">Bespoke Charter Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
