import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hajj & Umrah Packages',
  description: 'VIP and Royal Hajj & Umrah pilgrimage packages by Shomakal Air Service.',
};

const packages = [
  {
    title: 'VIP Umrah Horizon (Royal Package)',
    price: '$8,900 / pax',
    duration: '14 Days / 13 Nights',
    hotel: 'Raffles Makkah Palace & The Oberoi Madinah',
    features: [
      'Direct Apron VIP Transfer in Jeddah & Madinah',
      'Presidential Haram-Facing Suite',
      'Private Scholar (Mutawwif) Guidance',
      'Executive Jet Shuttle between Jeddah & Madinah',
      'All-Inclusive VIP Dining & Private Ziyarah',
    ],
    highlight: true,
  },
  {
    title: 'Executive Umrah Sanctuary',
    price: '$4,500 / pax',
    duration: '10 Days / 9 Nights',
    hotel: 'Swissotel Makkah & Pullman Zamzam Madinah',
    features: [
      'Fast-track Airport Immigration Clearance',
      'Luxury 5-Star Hotel Steps from Haram',
      'Private Chauffeur GMC Yukon Transfers',
      'Comprehensive Umrah Visa & Biometrics',
      'Daily Gourmet Breakfast Buffet',
    ],
    highlight: false,
  },
  {
    title: 'Royal Hajj Signature Allocation',
    price: 'Custom VIP Allocation',
    duration: '21 Days Premium Hajj Program',
    hotel: 'Clock Tower Luxury Suites & VIP Air-Conditioned Mina Camp',
    features: [
      'Pre-approved Diplomatic Quota Allocation',
      'Private Mina & Arafat Geodesic VIP Tents',
      'Direct Helicopter Transfer to Jamarat',
      'Dedicated Senior Islamic Scholars & Doctors 24/7',
      'Private Chef & Tailored Nutrition',
    ],
    highlight: false,
  },
];

export default function HajjAndUmrahPage() {
  return (
    <main className="w-full bg-[#071610] text-[#d4e7db] pt-28 pb-20 px-6 lg:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header Banner */}
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e9c349]"></span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#e9c349]">
              Sacred Pilgrimages
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Hajj &amp; Umrah Royal Steps
          </h1>
          <p className="text-base text-[#bec9be] max-w-3xl leading-relaxed">
            Perform your sacred obligations with utmost serenity, distinguished scholarly accompaniment, 
            and unprecedented proximity to the Holy Kaaba.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 border transition-all duration-300 ${
                pkg.highlight
                  ? 'bg-[#13231c] border-[#83d99d] shadow-2xl shadow-[#006838]/20'
                  : 'bg-[#0f1f18] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col gap-4">
                {pkg.highlight && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#e9c349] bg-[#e9c349]/10 px-3 py-1 rounded-full w-fit">
                    Most Popular Allocation
                  </span>
                )}
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{pkg.title}</h3>
                  <div className="text-2xl font-bold text-[#83d99d]">{pkg.price}</div>
                  <div className="text-xs text-[#bec9be] mt-1">{pkg.duration} • {pkg.hotel}</div>
                </div>

                <div className="h-[1px] bg-white/10 my-2"></div>

                <ul className="space-y-3 text-xs text-[#d4e7db]">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#83d99d] shrink-0">check_circle</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/booking?service=hajj&package=${encodeURIComponent(pkg.title)}`}
                className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all ${
                  pkg.highlight
                    ? 'bg-[#006838] hover:bg-[#0B6E3F] text-white shadow-lg'
                    : 'bg-[#1d2d26] hover:bg-[#2c3d35] text-white'
                }`}
              >
                Reserve Allocation
              </Link>
            </div>
          ))}
        </div>

        {/* Scholar Guidance & Protocol */}
        <div className="bg-[#13231c] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#83d99d]">
              Custom Pilgrimage Enquiries
            </span>
            <h3 className="font-display text-2xl font-bold text-white">Need a Family or Group Royal Allocation?</h3>
            <p className="text-xs text-[#bec9be] max-w-xl">
              Our Dhaka Pilgrimage Directorate provides dedicated bespoke programs with chartered airliners, private floor rentals, and multilingual scholars.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-[#83d99d] hover:bg-[#9ef5b8] text-[#00391c] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-lg"
          >
            Speak with Pilgrimage Attache
          </Link>
        </div>
      </div>
    </main>
  );
}
