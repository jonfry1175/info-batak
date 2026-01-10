'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { TimelineEvent } from '@/types';

interface TimelineProps {
  events: TimelineEvent[];
}

/**
 * Sorts timeline events chronologically by year
 * Handles both numeric years and string years (e.g., "Abad ke-14")
 */
export function sortTimelineEvents(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => {
    const yearA = parseTimelineYear(a.year);
    const yearB = parseTimelineYear(b.year);
    return yearA - yearB;
  });
}

/**
 * Parses timeline year to a numeric value for sorting
 * Handles:
 * - Numeric years (e.g., 1907)
 * - Century strings (e.g., "Abad ke-14" -> 1350)
 * - String numbers (e.g., "1907" -> 1907)
 */
export function parseTimelineYear(year: number | string): number {
  if (typeof year === 'number') {
    return year;
  }

  // Try parsing as a number string
  const numericYear = parseInt(year, 10);
  if (!isNaN(numericYear)) {
    return numericYear;
  }

  // Handle century format (e.g., "Abad ke-14", "Abad ke-15")
  const centuryMatch = year.match(/abad\s*ke[- ]?(\d+)/i);
  if (centuryMatch) {
    const century = parseInt(centuryMatch[1], 10);
    // Return middle of the century (e.g., 14th century -> 1350)
    return (century - 1) * 100 + 50;
  }

  // Default: return 0 for unparseable years (will sort first)
  return 0;
}

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
}

function TimelineItem({ event, index, isLeft }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-start`}
    >
      {/* Content Card */}
      <div
        className={`relative w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0' : 'md:pl-0'} pl-8 md:pl-0`}
      >
        <div className="border-foreground/10 bg-background rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md">
          {/* Year Badge */}
          <div
            className={`bg-accent/10 text-accent mb-3 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold`}
          >
            {event.year}
          </div>

          {/* Title */}
          <h4 className="text-foreground mb-2 text-lg font-semibold">{event.title}</h4>

          {/* Description */}
          <p className="text-foreground/70 text-sm leading-relaxed">{event.description}</p>

          {/* Optional Image */}
          {event.image && (
            <div className="mt-3 overflow-hidden rounded-lg">
              <div className="relative aspect-video">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          )}
        </div>

        {/* Connector dot - Mobile */}
        <div className="border-accent bg-background absolute top-6 left-0 h-4 w-4 rounded-full border-4 md:hidden" />

        {/* Connector dot - Desktop */}
        <div
          className={`border-accent bg-background absolute top-6 hidden h-4 w-4 rounded-full border-4 md:block ${
            isLeft ? '-right-2 translate-x-1/2' : '-left-2 -translate-x-1/2'
          }`}
        />
      </div>
    </motion.div>
  );
}

export function Timeline({ events }: TimelineProps) {
  // Sort events chronologically
  const sortedEvents = sortTimelineEvents(events);

  if (sortedEvents.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Vertical Line - Mobile */}
      <div className="bg-foreground/20 absolute top-0 left-[7px] h-full w-0.5 md:hidden" />

      {/* Vertical Line - Desktop (centered) */}
      <div className="bg-foreground/20 absolute top-0 left-1/2 hidden h-full w-0.5 -translate-x-1/2 md:block" />

      {/* Timeline Items */}
      <div className="space-y-6 md:space-y-8">
        {sortedEvents.map((event, index) => (
          <TimelineItem
            key={`${event.year}-${index}`}
            event={event}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>

      {/* End marker */}
      <div className="bg-accent absolute bottom-0 left-[3px] h-3 w-3 rounded-full md:left-1/2 md:-translate-x-1/2" />
    </div>
  );
}
