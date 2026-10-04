import type { Metadata } from 'next';
import { Playfair_Display, Hanken_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header/header';
import { MainContent } from '@/components/layout/main-content';
import { Footer } from '@/components/layout/footer/footer';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-playfair',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-hanken',
});

export const metadata: Metadata = {
  title: { default: 'Shomakal Air Service — Hajj, Umrah & Tours', template: '%s | Shomakal Air Service' },
  description: 'Your trusted partner for Hajj, Umrah, and world-class tour experiences with Shomakal Air Service.',
  keywords: ['hajj', 'umrah', 'travel', 'tours', 'flights', 'hotels', 'visa'],
  openGraph: { type: 'website', locale: 'en_US', siteName: 'Shomakal Air Service' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
        />
      </head>
      <body
        className={cn(
          playfair.variable,
          plusJakarta.variable,
          hanken.variable,
          'font-sans antialiased bg-surface text-on-surface'
        )}
        suppressHydrationWarning
      >
        <Providers>
          <Header />
          <MainContent>{children}</MainContent>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
