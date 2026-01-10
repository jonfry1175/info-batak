'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, BookOpen, Palette, Users, List } from 'lucide-react';

export interface TOCSection {
  id: string;
  title: string;
  icon?: string;
}

interface TableOfContentsProps {
  sections: TOCSection[];
  activeSection?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  wilayah: <MapPin className="h-4 w-4" />,
  sejarah: <BookOpen className="h-4 w-4" />,
  budaya: <Palette className="h-4 w-4" />,
  tokoh: <Users className="h-4 w-4" />,
  default: <List className="h-4 w-4" />,
};

function getIcon(sectionId: string, iconName?: string): React.ReactNode {
  if (iconName && iconMap[iconName]) {
    return iconMap[iconName];
  }
  return iconMap[sectionId] || iconMap.default;
}

/**
 * TableOfContents component for sticky navigation on desktop
 * - Sticky positioning on desktop
 * - Smooth scroll to section
 * - Active section highlighting with Intersection Observer
 * - Hidden on mobile
 */
export function TableOfContents({ sections, activeSection: controlledActiveSection }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>(
    controlledActiveSection || (sections.length > 0 ? sections[0].id : '')
  );

  // Update active section when controlled prop changes
  useEffect(() => {
    if (controlledActiveSection) {
      setActiveSection(controlledActiveSection);
    }
  }, [controlledActiveSection]);

  // Intersection Observer for active section detection
  useEffect(() => {
    // Skip if controlled externally
    if (controlledActiveSection) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections, controlledActiveSection]);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  if (sections.length === 0) {
    return null;
  }

  return (
    <nav
      className="hidden lg:block"
      aria-label="Daftar Isi"
    >
      <div className="sticky top-24">
        <div className="rounded-xl border border-foreground/10 bg-background p-4 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/60">
            Daftar Isi
          </h3>
          <ul className="space-y-1">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-accent/10 text-accent font-medium'
                        : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
                    }`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
                        isActive
                          ? 'bg-accent/20 text-accent'
                          : 'bg-foreground/5 text-foreground/50 group-hover:bg-foreground/10 group-hover:text-foreground/70'
                      }`}
                    >
                      {getIcon(section.id, section.icon)}
                    </span>
                    <span className="flex-1">{section.title}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

/**
 * Default sections for rumpun detail page
 */
export const defaultRumpunSections: TOCSection[] = [
  { id: 'wilayah', title: 'Wilayah', icon: 'wilayah' },
  { id: 'sejarah', title: 'Sejarah', icon: 'sejarah' },
  { id: 'budaya', title: 'Budaya', icon: 'budaya' },
  { id: 'tokoh', title: 'Tokoh Penting', icon: 'tokoh' },
];
