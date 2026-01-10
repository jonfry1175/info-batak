import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getAllRumpun, getRumpunBySlug } from './data';
import { RumpunBatakEnhanced, EnhancedTokoh } from '@/types';

/**
 * **Feature: rumpun-batak-pages, Property 5: Data Schema Validity**
 * **Validates: Requirements 6.2**
 *
 * For any rumpun object in rumpun.json, it SHALL contain all required fields:
 * id, nama, slug, deskripsi, gambar, sejarah, budaya, wilayah, and tokoh.
 * 
 * Updated to support enhanced data structure where sejarah, budaya, and wilayah are objects.
 */
describe('Property 5: Data Schema Validity', () => {
    const allRumpun = getAllRumpun() as RumpunBatakEnhanced[];

    it('should have exactly 6 rumpun entries', () => {
        expect(allRumpun).toHaveLength(6);
    });

    it('should have all required fields for every rumpun', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (rumpun: RumpunBatakEnhanced) => {
                    // Check all required string fields exist and are non-empty
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

                    // Enhanced structure: sejarah, budaya, wilayah are objects
                    expect(typeof rumpun.sejarah).toBe('object');
                    expect(rumpun.sejarah).not.toBeNull();
                    expect(typeof rumpun.sejarah.ringkasan).toBe('string');

                    expect(typeof rumpun.budaya).toBe('object');
                    expect(rumpun.budaya).not.toBeNull();
                    expect(typeof rumpun.budaya.ringkasan).toBe('string');

                    expect(typeof rumpun.wilayah).toBe('object');
                    expect(rumpun.wilayah).not.toBeNull();
                    expect(typeof rumpun.wilayah.nama).toBe('string');

                    // Check tokoh array exists and has at least one entry
                    expect(Array.isArray(rumpun.tokoh)).toBe(true);
                    expect(rumpun.tokoh.length).toBeGreaterThan(0);

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should have valid tokoh data for every rumpun', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (rumpun: RumpunBatakEnhanced) => {
                    rumpun.tokoh.forEach((tokoh: EnhancedTokoh) => {
                        expect(typeof tokoh.nama).toBe('string');
                        expect(tokoh.nama.length).toBeGreaterThan(0);

                        expect(typeof tokoh.gelar).toBe('string');
                        expect(tokoh.gelar.length).toBeGreaterThan(0);

                        // Enhanced tokoh uses ringkasan instead of deskripsi
                        expect(typeof tokoh.ringkasan).toBe('string');
                        expect(tokoh.ringkasan.length).toBeGreaterThan(0);
                    });

                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should have unique slugs for all rumpun', () => {
        const slugs = allRumpun.map((r) => r.slug);
        const uniqueSlugs = new Set(slugs);
        expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('should return correct rumpun when queried by slug', () => {
        fc.assert(
            fc.property(
                fc.constantFrom(...allRumpun),
                (rumpun: RumpunBatakEnhanced) => {
                    const found = getRumpunBySlug(rumpun.slug);
                    expect(found).toBeDefined();
                    expect(found?.id).toBe(rumpun.id);
                    expect(found?.nama).toBe(rumpun.nama);
                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should return undefined for invalid slug', () => {
        fc.assert(
            fc.property(
                fc.string().filter((s) => !allRumpun.some((r) => r.slug === s)),
                (invalidSlug: string) => {
                    const found = getRumpunBySlug(invalidSlug);
                    expect(found).toBeUndefined();
                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });
});
