'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/sejarah', label: 'Sejarah' },
  {
    label: 'Budaya',
    subLinks: [
      { href: '/budaya/adat-istiadat', label: 'Adat Istiadat' },
      { href: '/budaya/kesenian', label: 'Kesenian' },
      { href: '/budaya/aksara-batak', label: 'Aksara Batak' },
    ],
  },
  { href: '/marga', label: 'Marga' },
  { href: '/berita', label: 'Berita' },
  { href: '/tentang', label: 'Tentang' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background/80 border-foreground/10 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-accent text-xl font-bold">InfoBatak.id</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex">
            {navLinks.map((link) =>
              link.subLinks ? (
                <div key={link.label} className="group relative">
                  <button className="text-foreground/80 hover:text-accent font-medium transition-colors">
                    {link.label}
                  </button>
                  <div className="bg-background border-foreground/10 invisible absolute left-0 mt-2 w-48 rounded-md border opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className={`hover:bg-accent/10 block px-4 py-2 text-sm transition-colors first:rounded-t-md last:rounded-b-md ${
                          pathname === subLink.href
                            ? 'text-accent font-medium'
                            : 'text-foreground/80'
                        }`}
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    pathname === link.href ? 'text-accent' : 'text-foreground/80 hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <DarkModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <DarkModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-foreground/10 rounded-md p-2 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-foreground/10 bg-background border-t md:hidden">
          <div className="space-y-1 px-4 py-2">
            {navLinks.map((link) =>
              link.subLinks ? (
                <div key={link.label} className="space-y-1">
                  <div className="text-foreground/60 py-2 font-medium">{link.label}</div>
                  {link.subLinks.map((subLink) => (
                    <Link
                      key={subLink.href}
                      href={subLink.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2 pl-4 transition-colors ${
                        pathname === subLink.href
                          ? 'text-accent font-medium'
                          : 'text-foreground/80 hover:text-accent'
                      }`}
                    >
                      {subLink.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 transition-colors ${
                    pathname === link.href
                      ? 'text-accent font-medium'
                      : 'text-foreground/80 hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
