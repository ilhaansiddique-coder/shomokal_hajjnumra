import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Message from CEO',
  description: 'A message from the Chief Executive Officer of Shomakal Air Service.',
};

export default function MessageFromCeoPage() {
  return (
    <main className="w-full bg-[#071610] text-[#d4e7db] pt-28 pb-20 px-6 lg:px-12 min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Header Banner */}
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#83d99d]"></span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#83d99d]">
              Executive Address
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Message from the CEO
          </h1>
          <p className="text-base text-[#bec9be] leading-relaxed">
            A commitment to excellence, sacred service, and transformative global aviation.
          </p>
        </div>

        {/* CEO Message Card */}
        <div className="bg-[#13231c] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col gap-6 shadow-2xl">
          <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-[#006838]/15 blur-3xl rounded-full"></div>

          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#006838]/30 border border-[#83d99d]/30 flex items-center justify-center text-[#83d99d] font-display text-2xl font-bold">
              SA
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-white">Chief Executive Officer</span>
              <span className="text-xs uppercase font-bold tracking-widest text-[#83d99d]">
                Shomakal Aviation &amp; Expeditions Ltd.
              </span>
            </div>
          </div>

          <div className="text-base text-[#d4e7db] leading-relaxed space-y-4 font-light">
            <p className="italic text-lg text-white font-serif">
              &ldquo;Welcome to Shomakal Air Service. From our inception, our mission has been singular: 
              to provide an unparalleled standard of safety, honor, and logistical perfection to every pilgrim and voyager who places their trust in our wings.&rdquo;
            </p>

            <p className="text-sm text-[#bec9be]">
              For those undertaking the sacred pilgrimage of Hajj and Umrah, we believe that the spiritual journey 
              begins the moment you prepare to depart. It must be free of distress, marked by respectful scholar guidance, 
              expedited apron transfers, and premier accommodation overlooking the Holy Sanctuaries.
            </p>

            <p className="text-sm text-[#bec9be]">
              As global aviation continues to evolve, Shomakal has invested heavily in state-of-the-art telemetry, 
              direct sovereign corridor clearances, and 24/7 dedicated dispatch desks in Dhaka, Dubai, London, and Geneva. 
              Our team works tirelessly to ensure your travel is not merely efficient, but truly unforgettable.
            </p>

            <p className="text-sm text-[#bec9be]">
              On behalf of our entire flight crew, operations staff, and scholars, we thank you for choosing Shomakal. 
              We look forward to serving you across every sky.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-white">Managing Directorate</span>
              <span className="text-xs text-[#bec9be]">Dhaka Head Office • Bangladesh</span>
            </div>
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-[#006838] hover:bg-[#0B6E3F] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
