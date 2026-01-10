'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Music, Shirt, Home, Sparkles } from 'lucide-react';

export interface CategoryTab {
  id: string;
  title: string;
  icon: string;
}

interface CategoryTabsProps {
  categories: CategoryTab[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  sistemKekerabatan: <Users className="h-4 w-4" />,
  musikTarian: <Music className="h-4 w-4" />,
  pakaian: <Shirt className="h-4 w-4" />,
  rumahAdat: <Home className="h-4 w-4" />,
  upacaraAdat: <Sparkles className="h-4 w-4" />,
};

const defaultIcon = <Sparkles className="h-4 w-4" />;

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeTab = activeTabRef.current;
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      // Check if tab is not fully visible
      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        activeTab.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeCategory]);

  return (
    <div className="relative">
      {/* Gradient fade indicators for scroll */}
      <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-8 bg-gradient-to-r to-transparent md:hidden" />
      <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-8 bg-gradient-to-l to-transparent md:hidden" />

      {/* Scrollable tabs container */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex gap-2 overflow-x-auto px-1 py-2 md:flex-wrap md:overflow-x-visible"
        role="tablist"
        aria-label="Kategori Budaya"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const icon = iconMap[category.id] || defaultIcon;

          return (
            <button
              key={category.id}
              ref={isActive ? activeTabRef : null}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${category.id}`}
              onClick={() => onCategoryChange(category.id)}
              className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-white'
                  : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="bg-accent absolute inset-0 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {icon}
                <span className="whitespace-nowrap">{category.title}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Default budaya categories with their display titles
 */
export const defaultBudayaCategories: CategoryTab[] = [
  { id: 'sistemKekerabatan', title: 'Sistem Kekerabatan', icon: 'users' },
  { id: 'musikTarian', title: 'Musik & Tarian', icon: 'music' },
  { id: 'pakaian', title: 'Pakaian', icon: 'shirt' },
  { id: 'rumahAdat', title: 'Rumah Adat', icon: 'home' },
  { id: 'upacaraAdat', title: 'Upacara Adat', icon: 'sparkles' },
];
