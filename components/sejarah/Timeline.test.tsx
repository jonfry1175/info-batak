import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { sortTimelineEvents, parseTimelineYear } from './Timeline';
import { TimelineEvent } from '@/types';
import { getAllRumpunEnhanced } from '@/lib/data';

/**
 * **Feature: rumpun-detail-enhancement, Property 3: Timeline Chronological Order**
 * **Validates: Requirements 2.2, 2.3**
 *
 * For any sejarah.timeline array with multiple events, the rendered timeline
 * SHALL display events sorted in chronological order by year.
 */
describe('Property 3: Timeline Chronological Order', () => {
  // Arbitrary generator for TimelineEvent with numeric year
  const numericYearEventArb = fc.record({
    year: fc.integer({ min: 1000, max: 2100 }),
    title: fc.string({ minLength: 1, maxLength: 100 }),
    description: fc.string({ minLength: 1, maxLength: 500 }),
    image: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
  });

  // Arbitrary generator for TimelineEvent with century string
  const centuryYearEventArb = fc.record({
    year: fc.integer({ min: 1, max: 21 }).map((century) => `Abad ke-${century}`),
    title: fc.string({ minLength: 1, maxLength: 100 }),
    description: fc.string({ minLength: 1, maxLength: 500 }),
    image: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
  });

  // Mixed arbitrary generator
  const timelineEventArb = fc.oneof(numericYearEventArb, centuryYearEventArb);

  // Array of timeline events
  const timelineEventsArb = fc.array(timelineEventArb, { minLength: 2, maxLength: 20 });

  it('should sort timeline events in chronological order for any array of events', () => {
    fc.assert(
      fc.property(timelineEventsArb, (events: TimelineEvent[]) => {
        const sorted = sortTimelineEvents(events);

        // Verify sorted array has same length
        expect(sorted.length).toBe(events.length);

        // Verify chronological order
        for (let i = 1; i < sorted.length; i++) {
          const prevYear = parseTimelineYear(sorted[i - 1].year);
          const currYear = parseTimelineYear(sorted[i].year);
          expect(prevYear).toBeLessThanOrEqual(currYear);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should preserve all events when sorting (no data loss)', () => {
    fc.assert(
      fc.property(timelineEventsArb, (events: TimelineEvent[]) => {
        const sorted = sortTimelineEvents(events);

        // Same number of events
        expect(sorted.length).toBe(events.length);

        // All original events should be present in sorted array
        events.forEach((event) => {
          const found = sorted.some(
            (s) =>
              s.year === event.year && s.title === event.title && s.description === event.description
          );
          expect(found).toBe(true);
        });

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should correctly parse numeric years', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1000, max: 2100 }), (year: number) => {
        const parsed = parseTimelineYear(year);
        expect(parsed).toBe(year);
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should correctly parse string numeric years', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1000, max: 2100 }), (year: number) => {
        const parsed = parseTimelineYear(String(year));
        expect(parsed).toBe(year);
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should correctly parse century format years', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 21 }), (century: number) => {
        const centuryStr = `Abad ke-${century}`;
        const parsed = parseTimelineYear(centuryStr);
        // Century N should map to (N-1)*100 + 50 (middle of century)
        const expected = (century - 1) * 100 + 50;
        expect(parsed).toBe(expected);
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should not mutate the original array when sorting', () => {
    fc.assert(
      fc.property(timelineEventsArb, (events: TimelineEvent[]) => {
        const originalOrder = events.map((e) => e.year);
        sortTimelineEvents(events);
        const afterSortOrder = events.map((e) => e.year);

        // Original array should remain unchanged
        expect(afterSortOrder).toEqual(originalOrder);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should handle real rumpun timeline data correctly', () => {
    const allEnhancedRumpun = getAllRumpunEnhanced();

    fc.assert(
      fc.property(fc.constantFrom(...allEnhancedRumpun), (rumpun) => {
        const timeline = rumpun.sejarah.timeline;

        if (timeline.length > 1) {
          const sorted = sortTimelineEvents(timeline);

          // Verify chronological order
          for (let i = 1; i < sorted.length; i++) {
            const prevYear = parseTimelineYear(sorted[i - 1].year);
            const currYear = parseTimelineYear(sorted[i].year);
            expect(prevYear).toBeLessThanOrEqual(currYear);
          }
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('should handle empty array gracefully', () => {
    const sorted = sortTimelineEvents([]);
    expect(sorted).toEqual([]);
  });

  it('should handle single event array', () => {
    const singleEvent: TimelineEvent = {
      year: 1907,
      title: 'Test Event',
      description: 'Test Description',
    };
    const sorted = sortTimelineEvents([singleEvent]);
    expect(sorted).toHaveLength(1);
    expect(sorted[0]).toEqual(singleEvent);
  });
});
