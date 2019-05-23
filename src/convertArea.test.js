import convertArea from './convertArea';

describe('convertArea', () => {
    it('converts a numeric value into different area units (km2, ha, a, ...)', () => {
        expect(convertArea(50000, 'km2')).toEqual(0.049999999999999996);
        expect(convertArea(1000, 'ha')).toEqual(0.1);
        expect(convertArea(1000, 'a')).toEqual(10);
        expect(convertArea(1000, 'ft2')).toEqual(10763.911);
        expect(convertArea(1000, 'yd2')).toEqual(1195.99);
        expect(convertArea(1000, 'in2')).toEqual(1550003.0999999999);
    });

    it('should work with aliased units', () => {
        expect(convertArea(1000, 'sqft')).toEqual(convertArea(1000, 'ft2'));
    });

    it('should throw if an invalid unit was used', () => {
        expect(() => convertArea(150, 'invalid')).toThrow();
    });
});
