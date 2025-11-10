'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
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

  return (
    <nav className="bg-background/80 border-foreground/10 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-accent text-xl font-bold">InfoBatak.id</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-2 md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) =>
                  link.subLinks ? (
                    <NavigationMenuItem key={link.label}>
                      <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-3 p-4">
                          {link.subLinks.map((subLink) => (
                            <li key={subLink.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subLink.href}
                                  className={cn(
                                    'hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
                                    pathname === subLink.href && 'text-accent font-medium'
                                  )}
                                >
                                  <div className="text-sm leading-none font-medium">
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
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <DarkModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle mobile menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {navLinks.map((link, index) =>
                  link.subLinks ? (
                    <div key={link.label}>
                      <DropdownMenuItem disabled className="text-foreground/60 font-semibold">
                        {link.label}
                      </DropdownMenuItem>
                      {link.subLinks.map((subLink) => (
                        <DropdownMenuItem key={subLink.href} asChild>
                          <Link
                            href={subLink.href}
                            className={cn(
                              'pl-6',
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
                          className={cn(pathname === link.href && 'text-accent font-medium')}
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
