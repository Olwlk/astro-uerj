
import { describe, it, expect } from 'vitest';
import { calculateChartData, ZODIAC } from './astrology';

describe('Astrology Service', () => {
    it('should calculate chart data structure correctly', () => {
        const data = calculateChartData('2000-01-01', '12:00', 'tropical');
        expect(data).toHaveProperty('ascendant');
        expect(data).toHaveProperty('planets');
        expect(data.planets).toHaveLength(9); // 7 planets + Rahu/Ketu
        expect(data).toHaveProperty('atmakaraka');
        expect(data).toHaveProperty('darakaraka');
    });

    it('should calculate Sun position roughly correct for Jan 1st (Capricorn/Sagittarius)', () => {
        // Jan 1st is usually Capricorn in Tropical
        const data = calculateChartData('2000-01-01', '12:00', 'tropical');
        const sun = data.planets.find(p => p.id === 'sun');
        // Sun at ~280 degrees (Capricorn starts at 270)
        expect(sun.longitude).toBeGreaterThan(270);
        expect(sun.longitude).toBeLessThan(300);
        expect(sun.sign.name).toBe('Capricórnio');
    });

    it('should apply Ayanamsa for Vedic system', () => {
        const date = '2000-01-01';
        const time = '12:00';
        const tropical = calculateChartData(date, time, 'tropical');
        const vedic = calculateChartData(date, time, 'vedic');

        const sunTropical = tropical.planets.find(p => p.id === 'sun');
        const sunVedic = vedic.planets.find(p => p.id === 'sun');

        // Vedic Sun should be behind Tropical Sun by ~24 degrees
        const diff = (sunTropical.longitude - sunVedic.longitude + 360) % 360;
        expect(diff).toBeCloseTo(23.85, 0); // Approx 24
    });
});
