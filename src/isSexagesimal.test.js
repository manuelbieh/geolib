import isSexagesimal from './isSexagesimal';

describe('isSexagesimal', () => {
    it('checks if a value is in sexagesimal representation', () => {
        expect(isSexagesimal("51° 31.52'")).toBe(true);
        expect(isSexagesimal('7° 28\' 01"')).toBe(true);
        expect(isSexagesimal("7° 1'")).toBe(true);
        expect(isSexagesimal("51° 31.52' N")).toBe(true);
        expect(isSexagesimal('N')).toBe(false);
        expect(isSexagesimal('12')).toBe(false);
        expect(isSexagesimal('51.32')).toBe(false);
    });
});
