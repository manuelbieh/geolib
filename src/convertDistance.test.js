import convertDistance from './convertDistance';

describe('convertDistance', () => {
    it('converts a numeric value into different distance units (cm, m, km, mi)', () => {
        expect(convertDistance(1000, 'km')).toEqual(1);
        expect(convertDistance(10, 'cm')).toEqual(1000);
        expect(convertDistance(1609.344, 'mi')).toEqual(1);
    });

    it('should throw if an invalid unit was used', () => {
        expect(() => convertDistance(150, 'invalid')).toThrow();
    });
});
