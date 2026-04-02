import toRad from './toRad';

describe('toRad', () => {
    it('converts a value to a radian', () => {
        expect(toRad(2019.0439689092252)).toBeCloseTo(35.238965, 10);
    });
});
