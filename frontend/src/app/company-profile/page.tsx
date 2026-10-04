import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Company Profile',
  description: 'Company Profile of Shomakal Air Service.',
};

export default function CompanyProfilePage() {
  return (
    <main className="w-full bg-[#071610] text-[#d4e7db] pt-28 pb-20 px-6 lg:px-12 min-h-screen">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Header Banner */}
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#83d99d]"></span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#83d99d]">
              Corporate Dossier
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Company Profile
          </h1>
          <p className="text-base text-[#bec9be] max-w-3xl leading-relaxed">
            Shomakal Air Service Ltd. is an international aviation operator, 
            diplomatic clearance facilitator, and premier pilgrimage concierge based in Dhaka, Bangladesh.
          </p>
        </div>

        {/* Corporate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#13231c] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-display text-2xl font-semibold text-white">Who We Are</h2>
            <p className="text-sm text-[#bec9be] leading-relaxed">
              Founded with the objective of modernizing aviation corridors, pilgrimage logistics, 
              and luxury travel management, Shomakal provides end-to-end bespoke travel services. 
              We operate under full ICAO biosecurity protocols and maintain sovereign overflight rights across 
              over 140 sovereign air corridors worldwide.
            </p>
          </div>

          <div className="bg-[#13231c] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-display text-2xl font-semibold text-white">Core Competencies</h2>
            <ul className="text-sm text-[#bec9be] space-y-2.5">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#83d99d]"></span>
                VIP Hajj &amp; Umrah Royal Concierge &amp; Haram Luxury Suites
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#83d99d]"></span>
                Commercial Airline Ticketing &amp; Private Heavy Jet Charter
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#83d99d]"></span>
                Diplomatic Visa Processing &amp; Fast-Track Immigration Escort
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#83d99d]"></span>
                Worldwide Curated Stays, Bespoke Tours &amp; Helicopter Transfers
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Identity & Registration */}
        <div className="bg-[#0f1f18] border border-white/10 rounded-2xl p-8 flex flex-col gap-6">
          <h2 className="font-display text-2xl font-semibold text-white">Operating Credentials</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-[#13231c] rounded-xl border border-white/5">
              <span className="text-2xl font-bold text-white block">2020</span>
              <span className="text-xs text-[#bec9be] uppercase tracking-wider">Established</span>
            </div>
            <div className="p-4 bg-[#13231c] rounded-xl border border-white/5">
              <span className="text-2xl font-bold text-[#83d99d] block">100%</span>
              <span className="text-xs text-[#bec9be] uppercase tracking-wider">ICAO Compliant</span>
            </div>
            <div className="p-4 bg-[#13231c] rounded-xl border border-white/5">
              <span className="text-2xl font-bold text-white block">50,000+</span>
              <span className="text-xs text-[#bec9be] uppercase tracking-wider">Pilgrims &amp; Guests</span>
            </div>
            <div className="p-4 bg-[#13231c] rounded-xl border border-white/5">
              <span className="text-2xl font-bold text-[#e9c349] block">24/7</span>
              <span className="text-xs text-[#bec9be] uppercase tracking-wider">Operations Desk</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#13231c] rounded-2xl border border-white/10">
          <div>
            <h3 className="font-display text-xl font-bold text-white">Partner with Shomakal</h3>
            <p className="text-xs text-[#bec9be]">Connect with our institutional flight desk or corporate concierge.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-[#006838] hover:bg-[#0B6E3F] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
          >
            Contact Desk
          </Link>
        </div>
      </div>
    </main>
  );
}
