import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getAllRumpun, normalizeRumpunData, getAllRumpunEnhanced } from './data';
import { RumpunBatak, RumpunBatakEnhanced } from '@/types';

/**
 * **Feature: rumpun-detail-enhancement, Property 1: Data Schema Validity**
 * **Validates: Requirements 5.1, 5.2, 5.3, 5.4**
 *
 * For any rumpun data object in the enhanced format, it SHALL contain all required fields:
 * wilayah object with koordinat, sejarah object with ringkasan, budaya object with category fields,
 * and tokoh array with enhanced fields.
 */
describe('Property 1: Data Schema Validity', () => {
    const allEnhancedRumpun = getAllRumpunEnhanced();

    it('should have exactly 6 enhanced rumpun entries', () => {
        expect(allEnhancedRumpun).toHaveLength(6);
    });

    it('should have valid wilayah object with koordinat for every enhanced rumpun', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allEnhancedRumpun),
                (rumpun: RumpunBatakEnhanced) => {
                    // Requirement 5.1: wilayah object with koordinat
                    expect(typeof rumpun.wilayah).toBe('object');
                    expect(rumpun.wilayah).not.toBeNull();

                    expect(typeof rumpun.wilayah.nama).toBe('string');
                    expect(rumpun.wilayah.nama.length).toBeGreaterThan(0);

                    expect(typeof rumpun.wilayah.deskripsi).toBe('string');

                    expect(typeof rumpun.wilayah.koordinat).toBe('object');
                    expect(typeof rumpun.wilayah.koordinat.latitude).toBe('number');
                    expect(typeof rumpun.wilayah.koordinat.longitude).toBe('number');

                    // Valid coordinate ranges
                    expect(rumpun.wilayah.koordinat.latitude).toBeGreaterThanOrEqual(-90);
                    expect(rumpun.wilayah.koordinat.latitude).toBeLessThanOrEqual(90);
                    expect(rumpun.wilayah.koordinat.longitude).toBeGreaterThanOrEqual(-180);
                    expect(rumpun.wilayah.koordinat.longitude).toBeLessThanOrEqual(180);

                    expect(Array.isArray(rumpun.wilayah.kabupaten)).toBe(true);
                    expect(Array.isArray(rumpun.wilayah.landmarks)).toBe(true);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should have valid sejarah object with ringkasan for every enhanced rumpun', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allEnhancedRumpun),
                (rumpun: RumpunBatakEnhanced) => {
                    // Requirement 5.2: sejarah object with ringkasan
                    expect(typeof rumpun.sejarah).toBe('object');
                    expect(rumpun.sejarah).not.toBeNull();

                    expect(typeof rumpun.sejarah.ringkasan).toBe('string');
                    expect(rumpun.sejarah.ringkasan.length).toBeGreaterThan(0);

                    expect(typeof rumpun.sejarah.asalUsul).toBe('string');

                    expect(Array.isArray(rumpun.sejarah.timeline)).toBe(true);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should have valid budaya object with category fields for every enhanced rumpun', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allEnhancedRumpun),
                (rumpun: RumpunBatakEnhanced) => {
                    // Requirement 5.3: budaya object with category fields
                    expect(typeof rumpun.budaya).toBe('object');
                    expect(rumpun.budaya).not.toBeNull();

                    expect(typeof rumpun.budaya.ringkasan).toBe('string');

                    // All category fields should exist
                    expect(typeof rumpun.budaya.sistemKekerabatan).toBe('object');
                    expect(typeof rumpun.budaya.sistemKekerabatan.deskripsi).toBe('string');

                    expect(typeof rumpun.budaya.musikTarian).toBe('object');
                    expect(typeof rumpun.budaya.musikTarian.deskripsi).toBe('string');

                    expect(typeof rumpun.budaya.pakaian).toBe('object');
                    expect(typeof rumpun.budaya.pakaian.deskripsi).toBe('string');

                    expect(typeof rumpun.budaya.rumahAdat).toBe('object');
                    expect(typeof rumpun.budaya.rumahAdat.deskripsi).toBe('string');

                    expect(typeof rumpun.budaya.upacaraAdat).toBe('object');
                    expect(typeof rumpun.budaya.upacaraAdat.deskripsi).toBe('string');

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should have valid tokoh array with enhanced fields for every enhanced rumpun', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allEnhancedRumpun),
                (rumpun: RumpunBatakEnhanced) => {
                    // Requirement 5.4: tokoh array with enhanced fields
                    expect(Array.isArray(rumpun.tokoh)).toBe(true);
                    expect(rumpun.tokoh.length).toBeGreaterThan(0);

                    rumpun.tokoh.forEach((tokoh) => {
                        expect(typeof tokoh.nama).toBe('string');
                        expect(tokoh.nama.length).toBeGreaterThan(0);

                        expect(typeof tokoh.gelar).toBe('string');
                        expect(tokoh.gelar.length).toBeGreaterThan(0);

                        expect(typeof tokoh.bidang).toBe('string');
                        expect(tokoh.bidang.length).toBeGreaterThan(0);

                        expect(typeof tokoh.ringkasan).toBe('string');
                        expect(typeof tokoh.biografi).toBe('string');

                        expect(Array.isArray(tokoh.pencapaian)).toBe(true);
                    });

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should have all base fields preserved in enhanced format', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allEnhancedRumpun),
                (rumpun: RumpunBatakEnhanced) => {
                    expect(typeof rumpun.id).toBe('string');
                    expect(rumpun.id.length).toBeGreaterThan(0);

                    expect(typeof rumpun.nama).toBe('string');
                    expect(rumpun.nama.length).toBeGreaterThan(0);

                    expect(typeof rumpun.slug).toBe('string');
                    expect(rumpun.slug.length).toBeGreaterThan(0);

                    expect(typeof rumpun.deskripsi).toBe('string');
                    expect(rumpun.deskripsi.length).toBeGreaterThan(0);

                    expect(typeof rumpun.gambar).toBe('string');
                    expect(rumpun.gambar.length).toBeGreaterThan(0);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });
});


/**
 * **Feature: rumpun-detail-enhancement, Property 7: Backward Compatibility**
 * **Validates: Requirements 5.5**
 *
 * For any rumpun data in the old format (wilayah as string), the normalizeRumpunData function
 * SHALL produce a valid enhanced format object without data loss.
 */
describe('Property 7: Backward Compatibility', () => {
    const allRumpun = getAllRumpun();

    it('should convert old format to enhanced format without data loss', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (oldRumpun: RumpunBatak) => {
                    const enhanced = normalizeRumpunData(oldRumpun);

                    // Base fields should be preserved
                    expect(enhanced.id).toBe(oldRumpun.id);
                    expect(enhanced.nama).toBe(oldRumpun.nama);
                    expect(enhanced.slug).toBe(oldRumpun.slug);
                    expect(enhanced.deskripsi).toBe(oldRumpun.deskripsi);
                    expect(enhanced.gambar).toBe(oldRumpun.gambar);

                    // Wilayah string should be preserved in enhanced wilayah.nama
                    expect(enhanced.wilayah.nama).toBe(oldRumpun.wilayah);

                    // Sejarah string should be preserved in enhanced sejarah.ringkasan
                    expect(enhanced.sejarah.ringkasan).toBe(oldRumpun.sejarah);

                    // Budaya string should be preserved in enhanced budaya.ringkasan
                    expect(enhanced.budaya.ringkasan).toBe(oldRumpun.budaya);

                    // Tokoh count should be preserved
                    expect(enhanced.tokoh.length).toBe(oldRumpun.tokoh.length);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should preserve tokoh data when converting from old format', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (oldRumpun: RumpunBatak) => {
                    const enhanced = normalizeRumpunData(oldRumpun);

                    oldRumpun.tokoh.forEach((oldTokoh, index) => {
                        const enhancedTokoh = enhanced.tokoh[index];

                        // Core tokoh fields should be preserved
                        expect(enhancedTokoh.nama).toBe(oldTokoh.nama);
                        expect(enhancedTokoh.gelar).toBe(oldTokoh.gelar);
                        expect(enhancedTokoh.ringkasan).toBe(oldTokoh.deskripsi);
                        expect(enhancedTokoh.biografi).toBe(oldTokoh.deskripsi);
                    });

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should produce valid enhanced format structure from old format', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (oldRumpun: RumpunBatak) => {
                    const enhanced = normalizeRumpunData(oldRumpun);

                    // Enhanced format should have valid wilayah object
                    expect(typeof enhanced.wilayah).toBe('object');
                    expect(typeof enhanced.wilayah.koordinat).toBe('object');
                    expect(typeof enhanced.wilayah.koordinat.latitude).toBe('number');
                    expect(typeof enhanced.wilayah.koordinat.longitude).toBe('number');
                    expect(Array.isArray(enhanced.wilayah.kabupaten)).toBe(true);
                    expect(Array.isArray(enhanced.wilayah.landmarks)).toBe(true);

                    // Enhanced format should have valid sejarah object
                    expect(typeof enhanced.sejarah).toBe('object');
                    expect(typeof enhanced.sejarah.ringkasan).toBe('string');
                    expect(Array.isArray(enhanced.sejarah.timeline)).toBe(true);

                    // Enhanced format should have valid budaya object
                    expect(typeof enhanced.budaya).toBe('object');
                    expect(typeof enhanced.budaya.sistemKekerabatan).toBe('object');
                    expect(typeof enhanced.budaya.musikTarian).toBe('object');
                    expect(typeof enhanced.budaya.pakaian).toBe('object');
                    expect(typeof enhanced.budaya.rumahAdat).toBe('object');
                    expect(typeof enhanced.budaya.upacaraAdat).toBe('object');

                    // Enhanced format should have valid tokoh array
                    expect(Array.isArray(enhanced.tokoh)).toBe(true);
                    enhanced.tokoh.forEach((tokoh) => {
                        expect(typeof tokoh.nama).toBe('string');
                        expect(typeof tokoh.gelar).toBe('string');
                        expect(typeof tokoh.bidang).toBe('string');
                        expect(typeof tokoh.ringkasan).toBe('string');
                        expect(typeof tokoh.biografi).toBe('string');
                        expect(Array.isArray(tokoh.pencapaian)).toBe(true);
                    });

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should assign valid default coordinates for each rumpun slug', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (oldRumpun: RumpunBatak) => {
                    const enhanced = normalizeRumpunData(oldRumpun);

                    // Coordinates should be within valid ranges
                    expect(enhanced.wilayah.koordinat.latitude).toBeGreaterThanOrEqual(-90);
                    expect(enhanced.wilayah.koordinat.latitude).toBeLessThanOrEqual(90);
                    expect(enhanced.wilayah.koordinat.longitude).toBeGreaterThanOrEqual(-180);
                    expect(enhanced.wilayah.koordinat.longitude).toBeLessThanOrEqual(180);

                    // Coordinates should be in Sumatera Utara region (roughly)
                    expect(enhanced.wilayah.koordinat.latitude).toBeGreaterThanOrEqual(0);
                    expect(enhanced.wilayah.koordinat.latitude).toBeLessThanOrEqual(4);
                    expect(enhanced.wilayah.koordinat.longitude).toBeGreaterThanOrEqual(97);
                    expect(enhanced.wilayah.koordinat.longitude).toBeLessThanOrEqual(100);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should be idempotent - normalizing already enhanced data returns same structure', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (oldRumpun: RumpunBatak) => {
                    const enhanced = normalizeRumpunData(oldRumpun);
                    const doubleEnhanced = normalizeRumpunData(enhanced);

                    // Double normalization should produce identical result
                    expect(doubleEnhanced.id).toBe(enhanced.id);
                    expect(doubleEnhanced.nama).toBe(enhanced.nama);
                    expect(doubleEnhanced.slug).toBe(enhanced.slug);
                    expect(doubleEnhanced.wilayah.nama).toBe(enhanced.wilayah.nama);
                    expect(doubleEnhanced.wilayah.koordinat.latitude).toBe(enhanced.wilayah.koordinat.latitude);
                    expect(doubleEnhanced.wilayah.koordinat.longitude).toBe(enhanced.wilayah.koordinat.longitude);
                    expect(doubleEnhanced.sejarah.ringkasan).toBe(enhanced.sejarah.ringkasan);
                    expect(doubleEnhanced.budaya.ringkasan).toBe(enhanced.budaya.ringkasan);
                    expect(doubleEnhanced.tokoh.length).toBe(enhanced.tokoh.length);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });
});
