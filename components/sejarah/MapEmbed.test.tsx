import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { isValidCoordinate, generateMapEmbedUrl } from './MapEmbed';
import { getAllRumpunEnhanced } from '@/lib/data';
import { RumpunBatakEnhanced } from '@/types';

/**
 * **Feature: rumpun-detail-enhancement, Property 2: Map Component Data Binding**
 * **Validates: Requirements 1.1, 1.3**
 *
 * For any rumpun with wilayah.koordinat data, the MapEmbed component SHALL receive
 * valid latitude and longitude values within valid ranges (-90 to 90 for lat, -180 to 180 for lng).
 */
describe('Property 2: Map Component Data Binding', () => {
  const allEnhancedRumpun = getAllRumpunEnhanced();

  describe('isValidCoordinate function', () => {
    it('should return true for all valid coordinate pairs', () => {
      fc.assert(
        fc.property(
          fc.double({ min: -90, max: 90, noNaN: true }),
          fc.double({ min: -180, max: 180, noNaN: true }),
          (lat, lng) => {
            expect(isValidCoordinate(lat, lng)).toBe(true);
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return false for latitude outside valid range', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.double({ min: -1000, max: -90.001, noNaN: true }),
            fc.double({ min: 90.001, max: 1000, noNaN: true })
          ),
          fc.double({ min: -180, max: 180, noNaN: true }),
          (lat, lng) => {
            expect(isValidCoordinate(lat, lng)).toBe(false);
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return false for longitude outside valid range', () => {
      fc.assert(
        fc.property(
          fc.double({ min: -90, max: 90, noNaN: true }),
          fc.oneof(
            fc.double({ min: -1000, max: -180.001, noNaN: true }),
            fc.double({ min: 180.001, max: 1000, noNaN: true })
          ),
          (lat, lng) => {
            expect(isValidCoordinate(lat, lng)).toBe(false);
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return false for NaN values', () => {
      expect(isValidCoordinate(NaN, 0)).toBe(false);
      expect(isValidCoordinate(0, NaN)).toBe(false);
      expect(isValidCoordinate(NaN, NaN)).toBe(false);
    });

    it('should handle boundary values correctly', () => {
      // Exact boundaries should be valid
      expect(isValidCoordinate(-90, -180)).toBe(true);
      expect(isValidCoordinate(90, 180)).toBe(true);
      expect(isValidCoordinate(0, 0)).toBe(true);
    });
  });

  describe('generateMapEmbedUrl function', () => {
    it('should generate valid URL containing coordinates for all valid inputs', () => {
      fc.assert(
        fc.property(
          fc.double({ min: -90, max: 90, noNaN: true }),
          fc.double({ min: -180, max: 180, noNaN: true }),
          fc.integer({ min: 1, max: 20 }),
          (lat, lng, zoom) => {
            const url = generateMapEmbedUrl(lat, lng, zoom);

            // URL should be a valid Google Maps embed URL
            expect(url).toContain('https://www.google.com/maps/embed');
            expect(url).toContain(lng.toString());
            expect(url).toContain(lat.toString());

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should use default zoom of 10 when not specified', () => {
      const url = generateMapEmbedUrl(2.6167, 98.85);
      expect(url).toContain('https://www.google.com/maps/embed');
    });
  });

  describe('Real rumpun data coordinate validation', () => {
    it('should have valid coordinates for all enhanced rumpun data', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...allEnhancedRumpun),
          (rumpun: RumpunBatakEnhanced) => {
            const { latitude, longitude } = rumpun.wilayah.koordinat;

            // Coordinates should be valid
            expect(isValidCoordinate(latitude, longitude)).toBe(true);

            // Coordinates should be within Sumatera Utara region (roughly 0-4°N, 97-100°E)
            expect(latitude).toBeGreaterThanOrEqual(0);
            expect(latitude).toBeLessThanOrEqual(4);
            expect(longitude).toBeGreaterThanOrEqual(97);
            expect(longitude).toBeLessThanOrEqual(100);

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should generate valid map URLs for all enhanced rumpun data', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...allEnhancedRumpun),
          (rumpun: RumpunBatakEnhanced) => {
            const { latitude, longitude } = rumpun.wilayah.koordinat;
            const url = generateMapEmbedUrl(latitude, longitude);

            // URL should be valid and contain coordinates
            expect(url).toContain('https://www.google.com/maps/embed');
            expect(typeof url).toBe('string');
            expect(url.length).toBeGreaterThan(0);

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should have valid landmark coordinates for all enhanced rumpun', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...allEnhancedRumpun),
          (rumpun: RumpunBatakEnhanced) => {
            rumpun.wilayah.landmarks.forEach((landmark) => {
              // Each landmark should have valid coordinates
              expect(isValidCoordinate(landmark.latitude, landmark.longitude)).toBe(true);

              // Landmark coordinates should be within Sumatera Utara region
              expect(landmark.latitude).toBeGreaterThanOrEqual(0);
              expect(landmark.latitude).toBeLessThanOrEqual(4);
              expect(landmark.longitude).toBeGreaterThanOrEqual(97);
              expect(landmark.longitude).toBeLessThanOrEqual(100);
            });

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
