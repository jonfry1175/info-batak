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
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-accent">InfoBatak.id</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) =>
              link.subLinks ? (
                <div key={link.label} className="relative group">
                  <button className="text-foreground/80 hover:text-accent transition-colors font-medium">
                    {link.label}
                  </button>
                  <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-background border border-foreground/10 rounded-md shadow-lg">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className={`block px-4 py-2 text-sm hover:bg-accent/10 transition-colors first:rounded-t-md last:rounded-b-md ${
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
                  className={`transition-colors font-medium ${
                    pathname === link.href
                      ? 'text-accent'
                      : 'text-foreground/80 hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <DarkModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-foreground/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
        <div className="md:hidden border-t border-foreground/10 bg-background">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) =>
              link.subLinks ? (
                <div key={link.label} className="space-y-1">
                  <div className="py-2 font-medium text-foreground/60">
                    {link.label}
                  </div>
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
