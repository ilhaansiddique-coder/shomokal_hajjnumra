'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import logoImg from '@/images/shomakal_logo.jpeg';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Company Profile', href: '/company-profile' },
  { label: 'Message from CEO', href: '/message-from-ceo' },
  { label: 'Tours', href: '/tours' },
  { label: 'Visa', href: '/visa' },
  { label: 'Hajj & Umrah', href: '/hajj-and-umrah' },
  { label: 'Hotels', href: '/hotels' },
  { label: 'Tickets', href: '/flights' },
  { label: 'Blog', href: '/blog' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      const el = document.querySelector('header');
      if (el) el.dataset.scrolled = String(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  if (pathname.startsWith('/admin')) return null;

  return (
    <header
      className="fixed top-0 w-full z-50 h-20 transition-all duration-300 backdrop-blur-xl border-b"
      style={{
        backgroundColor: 'var(--color-header-bg)',
        borderColor: 'var(--color-header-border)',
      }}
    >
      <div className="flex justify-between items-center px-4 sm:px-8 xl:px-12 max-w-[1680px] mx-auto h-full gap-4">
        <div className="flex items-center gap-6 xl:gap-8 min-w-0">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <Image
              src={logoImg}
              alt="Shomakal Air Service"
              width={44}
              height={44}
              priority
              className="rounded-xl object-contain w-10 h-10 transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span
                className="font-bold text-base sm:text-lg tracking-wide hidden sm:inline-block leading-tight transition-colors"
                style={{ color: 'var(--color-header-text)' }}
              >
                Shomakal
              </span>
              <span className="font-bold text-[9px] tracking-widest uppercase hidden sm:inline-block text-[#83d99d]">
                Aviation &amp; Expeditions
              </span>
            </div>
          </Link>
          <nav className="hidden xl:flex items-center gap-3 2xl:gap-4 flex-shrink-0">
            {navItems.map((item) => {
              const active = item.href === '/'
                ? pathname === '/'
                : pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className={cn(
                    'text-xs 2xl:text-[13px] font-semibold tracking-normal whitespace-nowrap transition-colors py-1',
                    active
                      ? 'font-bold border-b-2 pb-0.5'
                      : 'hover:opacity-100'
                  )}
                  style={{
                    color: active ? 'var(--color-nav-active)' : 'var(--color-nav-inactive)',
                    borderColor: active ? 'var(--color-nav-active)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.target as HTMLElement).style.color = 'var(--color-nav-hover)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.target as HTMLElement).style.color = 'var(--color-nav-inactive)';
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div
            className="hidden 2xl:flex items-center px-3 py-1.5 rounded-full transition-all hover:opacity-80"
            style={{
              backgroundColor: 'var(--color-header-search-bg)',
              border: '1px solid var(--color-header-search-border)',
            }}
          >
            <Search className="mr-2 w-4 h-4" style={{ color: 'var(--color-header-text-muted)' }} />
            <input
              className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all"
              placeholder="Search..."
              type="text"
              style={{
                color: 'var(--color-header-search-text)',
              }}
              onFocus={(e) => (e.target.style.setProperty('--tw-placeholder-color', 'transparent'))}
            />
            <style jsx>{`
              input::placeholder {
                color: var(--color-header-search-placeholder);
              }
            `}</style>
          </div>

          {isAuthenticated() && user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/admin/dashboard"
                className="hidden sm:flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--color-header-text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-header-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-header-text-muted)')}
              >
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
                  style={{
                    backgroundColor: 'var(--color-header-search-bg)',
                    border: '1px solid var(--color-header-search-border)',
                    color: 'var(--color-header-text)',
                  }}
                >
                  {user.role}
                </span>
                <span className="hidden lg:inline">{user.fullName}</span>
              </Link>
              <button
                onClick={() => { logout(); window.location.href = '/'; }}
                className="transition-all hover:scale-110 p-2"
                style={{ color: 'var(--color-header-text-muted)' }}
                title="Logout"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hidden sm:inline-flex text-sm font-medium transition-colors"
                style={{ color: 'var(--color-header-text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-header-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-header-text-muted)')}
              >
                Sign In
              </Link>
              <Link
                href="/booking"
                className="px-6 py-2.5 rounded-full text-sm font-bold tracking-wider transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: 'var(--color-header-btn-bg)',
                  color: 'var(--color-header-btn-text)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-header-btn-hover-bg)';
                  e.currentTarget.style.color = 'var(--color-header-btn-hover-text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-header-btn-bg)';
                  e.currentTarget.style.color = 'var(--color-header-btn-text)';
                }}
              >
                Book Now
              </Link>
              <Link
                href="/auth/login"
                className="transition-all hover:scale-110"
                style={{ color: 'var(--color-header-text)' }}
              >
                <User className="w-8 h-8" />
              </Link>
            </>
          )}

          <ThemeToggle />

          <button
            className="xl:hidden p-2 rounded-xl transition-colors hover:bg-white/10"
            style={{ color: 'var(--color-header-text)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 top-20 z-40 animate-slide-up overflow-y-auto"
          style={{ backgroundColor: 'var(--color-mobile-menu-bg)' }}
        >
          <div className="p-6 pt-8 pb-20">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className={cn(
                      'px-4 py-4 rounded-xl text-base font-semibold transition-colors',
                      active
                        ? ''
                        : ''
                    )}
                    style={{
                      color: active ? 'var(--color-mobile-nav-active)' : 'var(--color-mobile-nav-text)',
                      backgroundColor: active ? 'var(--color-mobile-nav-bg)' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = 'var(--color-nav-hover)';
                        e.currentTarget.style.backgroundColor = 'var(--color-mobile-nav-hover-bg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = 'var(--color-mobile-nav-text)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div
                className="my-4"
                style={{ borderTop: '1px solid var(--color-mobile-divider)' }}
              />
              {isAuthenticated() && user ? (
                <>
                  <Link
                    href="/admin/dashboard"
                    className="px-4 py-4 rounded-xl text-base font-medium transition-colors"
                    style={{ color: 'var(--color-mobile-nav-text)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-nav-hover)';
                      e.currentTarget.style.backgroundColor = 'var(--color-mobile-nav-hover-bg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-mobile-nav-text)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); window.location.href = '/'; }}
                    className="px-4 py-4 rounded-xl text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-4 rounded-xl text-base font-medium transition-colors"
                    style={{ color: 'var(--color-mobile-nav-text)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-nav-hover)';
                      e.currentTarget.style.backgroundColor = 'var(--color-mobile-nav-hover-bg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-mobile-nav-text)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-4 rounded-xl text-base font-medium transition-colors"
                    style={{ color: 'var(--color-mobile-nav-text)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-nav-hover)';
                      e.currentTarget.style.backgroundColor = 'var(--color-mobile-nav-hover-bg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-mobile-nav-text)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
