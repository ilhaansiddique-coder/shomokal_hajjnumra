'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlaneTakeoff, CalendarDays, MapPin, Rocket, ArrowUpRight, ArrowRight, Building2, Star } from 'lucide-react';

const destinations = [
  { name: 'Makkah', slug: 'makkah', tag: 'Hajj & Umrah', price: 'From $1,499', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf5QzdFaYkZ_qkiyWWRq-WCpLwdY3Yx_zBdrsh3Ung7SxjFOTDIrHQw4bB0hMfJtFfq-oSxIWfjUWCiyEaYfmzERYqDlrVZPm0OPD2Npb_Agn6Bt2BdAVJl_2gpyRrkbLG9ElZrSLK4B2fkZpzzfN0zUaMIvs8ig7pNifGwbLOKTU2SZH3hcsntX5TXx79EzeifHcLX0xcOptF4yVDe3FZPbm_zgbWEqSqZOgV8JYAPzWwEr1TsUVKmw', featured: true },
  { name: 'Madinah', slug: 'madinah', tag: 'Hajj & Umrah', price: 'From $999', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Vke4Q6ZGIoLFvdAiYQpUMjSsa1OApffMFqvvcBVrTUhDQSPrwbRqQ4EHlJgxj4UaDu4tzISvY-_npW0zOSMEtu3tGBE_rCp5v6KYgK93fa-aX_OmcO3CuAKHtyfJY_azelB4WNa7kn43b7oZMG5pfOiswaeL51ZSdd5ZX2IlifxF0ayan5KfRFsYVOG93AzpRQG1qwnGEbTm42I6immIGr982o9TAmoljNjgb34UeDxOPXBFrsipkg' },
  { name: 'Dubai', slug: 'dubai', tag: 'Tours & Travels', price: 'From $799', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI-Pg9wYZ2XgNXNw_qA4ZmzpCW-bCwj9CgJkEdeFBtqESfOiWnV-CulYLIrm3BaAy5I8MzIDV01WLlV0w-_pLwdnrpvkdi_6PPBRiXxPcLadEOOnAx2c5gULhNsdZSGuf48UWc9oaWfOEISbClE5jeo79C9DKhJAQsFoNzakSjyrxVMql9GijSQs06adSaa-oVUTkEtaAptmmzGmzrk9Uy2TsEdfRvcRBHLvvvyiKqzHAASaNLIlFjkw' },
  { name: 'Bangkok', slug: 'bangkok', tag: 'Tours & Travels', price: 'From $599', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Vke4Q6ZGIoLFvdAiYQpUMjSsa1OApffMFqvvcBVrTUhDQSPrwbRqQ4EHlJgxj4UaDu4tzISvY-_npW0zOSMEtu3tGBE_rCp5v6KYgK93fa-aX_OmcO3CuAKHtyfJY_azelB4WNa7kn43b7oZMG5pfOiswaeL51ZSdd5ZX2IlifxF0ayan5KfRFsYVOG93AzpRQG1qwnGEbTm42I6immIGr982o9TAmoljNjgb34UeDxOPXBFrsipkg' },
  { name: 'Istanbul', slug: 'istanbul', tag: 'Tours & Travels', price: 'From $649', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf5QzdFaYkZ_qkiyWWRq-WCpLwdY3Yx_zBdrsh3Ung7SxjFOTDIrHQw4bB0hMfJtFfq-oSxIWfjUWCiyEaYfmzERYqDlrVZPm0OPD2Npb_Agn6Bt2BdAVJl_2gpyRrkbLG9ElZrSLK4B2fkZpzzfN0zUaMIvs8ig7pNifGwbLOKTU2SZH3hcsntX5TXx79EzeifHcLX0xcOptF4yVDe3FZPbm_zgbWEqSqZOgV8JYAPzWwEr1TsUVKmw' },
];

const services = [
  { title: 'Hajj Packages', description: 'Complete Hajj pilgrimage packages with guided tours, accommodation near Haram, and seamless logistics.', icon: Star, href: '/tours' },
  { title: 'Umrah Packages', description: 'Year-round Umrah packages for individuals, families, and groups with flexible durations.', icon: Building2, href: '/tours' },
  { title: 'Flight Tickets', description: 'Domestic and international flights at competitive prices with 24/7 customer support.', icon: PlaneTakeoff, href: '/flights' },
  { title: 'Visa Processing', description: 'Hassle-free visa processing for Saudi Arabia, UAE, Turkey, and 50+ countries.', icon: MapPin, href: '/visa' },
  { title: 'Hotel Booking', description: 'Handpicked hotels and apartments from budget to luxury in destinations worldwide.', icon: Building2, href: '/hotels' },
  { title: 'Tour Packages', description: 'Curated holiday packages for exotic destinations with guided sightseeing and activities.', icon: Star, href: '/tours' },
];

const stats = [
  { value: '5,000+', label: 'Pilgrims Served', accent: false },
  { value: '50+', label: 'Global Destinations', accent: true },
  { value: '24/7', label: 'Dedicated Support', accent: false },
  { value: '98%', label: 'Client Satisfaction', accent: true },
];

export default function HomePage() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [serviceType, setServiceType] = useState('Hajj');
  const [departureDate, setDepartureDate] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (serviceType) params.set('service', serviceType);
    if (departureDate) params.set('date', departureDate);
    router.push(`/booking?${params.toString()}`);
  };
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Shomakal Air Service — Hajj, Umrah & Tours"
            className="w-full h-full object-cover brightness-[0.85]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2Vke4Q6ZGIoLFvdAiYQpUMjSsa1OApffMFqvvcBVrTUhDQSPrwbRqQ4EHlJgxj4UaDu4tzISvY-_npW0zOSMEtu3tGBE_rCp5v6KYgK93fa-aX_OmcO3CuAKHtyfJY_azelB4WNa7kn43b7oZMG5pfOiswaeL51ZSdd5ZX2IlifxF0ayan5KfRFsYVOG93AzpRQG1qwnGEbTm42I6immIGr982o9TAmoljNjgb34UeDxOPXBFrsipkg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>

        <div className="relative z-10 px-16 max-w-[1440px] mx-auto w-full">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-block glass-white px-4 py-1.5 rounded-full text-white text-xs tracking-widest uppercase shadow-sm mb-6">
              Hajj & Umrah Specialist
            </span>
            <h1 className="font-display text-[60px] leading-[1.1] tracking-[-0.02em] font-bold text-white mb-6 drop-shadow-xl text-glow-blue">
              Your Journey of<br />
              <span className="text-white italic opacity-90">Faith & Discovery.</span>
            </h1>
            <p className="text-lg leading-relaxed text-white/90 mb-12 max-w-md drop-shadow-md">
              Embark on sacred pilgrimages to Makkah and Madinah, or explore the world with Shomakal Air Service&apos;s handcrafted travel experiences.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[1100px] px-4 z-20">
          <div className="glass-white shadow-2xl rounded-full">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
              className="flex flex-col md:flex-row items-stretch md:items-center gap-0 bg-white/10 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 overflow-hidden p-2"
            >
              <div className="flex-1 flex flex-col px-8 py-3 border-r border-white/10">
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Where to next?</label>
                <div className="flex items-center">
                  <MapPin className="text-[#00eefc] mr-2 w-5 h-5" />
                  <input
                    className="bg-transparent border-none outline-none text-base text-white placeholder:text-white/40 w-full p-0"
                    placeholder="Makkah, Madinah, Dubai..."
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col px-8 py-3 border-r border-white/10">
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Service Type</label>
                <div className="flex items-center cursor-pointer relative">
                  <Star className="text-[#00eefc] mr-2 w-5 h-5" />
                  <select
                    className="bg-transparent border-none outline-none text-base text-white w-full appearance-none p-0 pr-6"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                  >
                    <option className="bg-surface">Hajj</option>
                    <option className="bg-surface">Umrah</option>
                    <option className="bg-surface">Tour Package</option>
                    <option className="bg-surface">Flight Only</option>
                    <option className="bg-surface">Visa Processing</option>
                    <option className="bg-surface">Hotel Only</option>
                  </select>
                  <svg className="absolute right-0 text-white/50 w-4 h-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 flex flex-col px-8 py-3">
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Departure Date</label>
                <div className="flex items-center">
                  <CalendarDays className="text-[#00eefc] mr-2 w-5 h-5" />
                  <input
                    className="bg-transparent border-none outline-none text-base text-white w-full p-0 [color-scheme:dark]"
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-10 py-4 rounded-full text-sm font-bold tracking-wider transition-all duration-300 hover:bg-blue-700 hover:shadow-lg flex items-center justify-center gap-2 group whitespace-nowrap ml-2"
              >
                FIND JOURNEY
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="mt-32 px-16 max-w-[1440px] mx-auto mb-32">
        <div className="text-center mb-16">
          <span className="text-[#00eefc] text-xs tracking-widest uppercase font-semibold">What We Offer</span>
          <h2 className="font-display text-[48px] leading-tight font-semibold text-on-surface mt-4 mb-4">Hajj, Umrah & Travel Services</h2>
          <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
            From sacred pilgrimages to Makkah and Madinah to world-class tour experiences — we handle every detail so you can focus on what matters most.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group glass p-8 rounded-xl velocity-glow transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors">
                <service.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-display text-xl font-semibold text-on-surface mb-3">{service.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{service.description}</p>
              <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="bg-surface-container py-24 mb-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        <div className="px-16 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-1 bg-outline-variant" />
            <h2 className="text-sm tracking-[0.2em] uppercase text-on-surface-variant font-semibold whitespace-nowrap">Featured Destinations</h2>
            <div className="h-[1px] flex-1 bg-outline-variant" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.slug}
                className={`group relative rounded-xl overflow-hidden glass velocity-glow cursor-pointer ${dest.featured ? 'md:col-span-2' : ''}`}
              >
                <img
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={dest.image}
                  style={{ height: dest.featured ? '420px' : '300px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className={`text-xs tracking-widest uppercase block font-semibold mb-2 ${dest.tag === 'Hajj & Umrah' ? 'text-[#00eefc]' : 'text-blue-400'}`}>{dest.tag}</span>
                  <h3 className="font-display text-2xl font-semibold text-on-surface mb-1">{dest.name}</h3>
                  <p className="text-on-surface-variant text-sm">{dest.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-32">
        <div className="px-16 max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <span className={`block font-display text-[48px] leading-tight font-semibold mb-2 ${stat.accent ? 'text-[#00eefc]' : 'text-on-surface'}`}>
                {stat.value}
              </span>
              <span className="text-sm tracking-[0.1em] uppercase text-on-surface-variant font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-16 max-w-[1440px] mx-auto mb-32">
        <div className="glass-deep p-16 rounded-2xl relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-transparent to-transparent pointer-events-none" />
          <Rocket className="w-16 h-16 text-[#00eefc] mb-8" />
          <h2 className="font-display text-[48px] leading-tight font-semibold text-on-surface mb-6">Begin Your Sacred Journey</h2>
          <p className="text-lg leading-relaxed text-on-surface-variant mb-10 max-w-xl">
            Subscribe for exclusive Hajj/Umrah packages, early-bird tour deals, and members-only travel updates from Shomakal Air Service.
          </p>
          <form className="flex flex-col md:flex-row gap-4 w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
            <input
              className="flex-1 glass px-6 py-4 rounded-full outline-none focus:border-[#00eefc] transition-all text-on-surface placeholder:text-on-surface-variant bg-surface-container-low border-outline-variant"
              placeholder="Enter your email address"
              type="email"
            />
            <button className="bg-primary text-background px-10 py-4 rounded-full text-sm font-bold tracking-wider transition-all hover:bg-[#00eefc] hover:text-[#00686f] whitespace-nowrap">
              Join Now
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
