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
});
