'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, User } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/AuthProvider';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/sejarah', label: 'Sejarah' },
  {
    label: 'Budaya',
    subLinks: [
      { href: '/budaya', label: 'Semua Kategori' },
      { href: '/budaya/adat-istiadat', label: 'Adat Istiadat' },
      { href: '/budaya/kesenian', label: 'Kesenian' },
      { href: '/budaya/aksara-batak', label: 'Aksara Batak' },
      { href: '/budaya/arsitektur', label: 'Arsitektur' },
      { href: '/budaya/kuliner', label: 'Kuliner' },
      { href: '/budaya/pakaian-adat', label: 'Pakaian Adat' },
      { href: '/budaya/bahasa', label: 'Bahasa' },
    ],
  },
  { href: '/marga', label: 'Marga' },
  { href: '/berita', label: 'Berita' },
  { href: '/tentang', label: 'Tentang' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();

  return (
    <nav className="bg-background/80 border-foreground/10 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between sm:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="group transition-opacity hover:opacity-90"
            aria-label="InfoBatak.id - Kembali ke Beranda"
          >
            <Image
              src="/logo.png"
              alt="InfoBatak.id Logo"
              width={112}
              height={112}
              className="h-22 w-auto object-contain drop-shadow-sm sm:h-26"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-3 md:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navLinks.map((link) =>
                  link.subLinks ? (
                    <NavigationMenuItem key={link.label}>
                      <NavigationMenuTrigger className="text-base font-medium sm:text-lg">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[220px] gap-3 p-4">
                          {link.subLinks.map((subLink) => (
                            <li key={subLink.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subLink.href}
                                  className={cn(
                                    'hover:bg-accent/15 hover:text-foreground focus:bg-accent/15 focus:text-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
                                    pathname === subLink.href && 'bg-accent/20 text-foreground font-medium'
                                  )}
                                >
                                  <div className="text-base leading-tight font-medium">
                                    {subLink.label}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle,
                          'text-base font-medium sm:text-lg',
                          pathname === link.href && 'text-accent'
                        )}
                      >
                        <Link href={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
            <DarkModeToggle />

            {/* Auth Button / User Menu - Desktop */}
            {loading ? (
              <div className="bg-foreground/10 h-10 w-24 animate-pulse rounded-md" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2"
                    aria-label="Menu pengguna"
                  >
                    {user.avatar_url ? (
                      <Image
                        src={user.avatar_url}
                        alt={user.display_name || 'Avatar pengguna'}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="bg-accent flex h-8 w-8 items-center justify-center rounded-full text-white">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.display_name || 'Pengguna'}</p>
                    <p className="text-foreground/60 text-xs">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-white">
                <Link href="/login">Daftar/Masuk</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <DarkModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle mobile menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px] text-base">
                {/* Auth Section - Mobile */}
                {loading ? (
                  <div className="px-2 py-3">
                    <div className="bg-foreground/10 h-10 w-full animate-pulse rounded-md" />
                  </div>
                ) : user ? (
                  <>
                    <div className="flex items-center gap-3 px-2 py-3">
                      {user.avatar_url ? (
                        <Image
                          src={user.avatar_url}
                          alt={user.display_name || 'Avatar pengguna'}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="bg-accent flex h-10 w-10 items-center justify-center rounded-full text-white">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {user.display_name || 'Pengguna'}
                        </p>
                        <p className="text-foreground/60 truncate text-xs">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="text-accent text-base font-medium">
                        Daftar/Masuk
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}

                {navLinks.map((link, index) =>
                  link.subLinks ? (
                    <div key={link.label}>
                      <DropdownMenuItem
                        disabled
                        className="text-foreground/60 text-base font-semibold"
                      >
                        {link.label}
                      </DropdownMenuItem>
                      {link.subLinks.map((subLink) => (
                        <DropdownMenuItem key={subLink.href} asChild>
                          <Link
                            href={subLink.href}
                            className={cn(
                              'pl-6 text-base',
                              pathname === subLink.href && 'text-accent font-medium'
                            )}
                          >
                            {subLink.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      {index < navLinks.length - 1 && <DropdownMenuSeparator />}
                    </div>
                  ) : (
                    <div key={link.href}>
                      <DropdownMenuItem asChild>
                        <Link
                          href={link.href}
                          className={cn(
                            'text-base',
                            pathname === link.href && 'text-accent font-medium'
                          )}
                        >
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                      {index < navLinks.length - 1 && link.href === '/sejarah' && (
                        <DropdownMenuSeparator />
                      )}
                    </div>
                  )
                )}

                {/* Logout Option - Mobile */}
                {user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Keluar
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
