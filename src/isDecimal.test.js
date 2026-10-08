import isDecimal from './isDecimal';

describe('isDecimal', () => {
    it('checks if a value is a decimal', () => {
        expect(isDecimal(2)).toBe(true);
        expect(isDecimal('xyz')).toBe(false);
        expect(isDecimal('2.0')).toBe(true);
        expect(isDecimal(' 2.0 ')).toBe(true);
        expect(isDecimal(' 1..0 ')).toBe(false);
        expect(isDecimal(Infinity)).toBe(true);
    });

    it('returns false for null and undefined', () => {
        expect(isDecimal(null)).toBe(false);
        expect(isDecimal(undefined)).toBe(false);
    });

    it('checks numbers without converting them to strings', () => {
        expect(isDecimal(0)).toBe(true);
        expect(isDecimal(-0)).toBe(true);
        expect(isDecimal(-12.5)).toBe(true);
        expect(isDecimal(1e-7)).toBe(true);
        expect(isDecimal(-Infinity)).toBe(true);
        expect(isDecimal(NaN)).toBe(false);
    });
});
