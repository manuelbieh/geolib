import robustAcos from './robustAcos';

describe('robustAcos', () => {
    it('should return positive 1 if the value is greater than 1', () => {
        expect(robustAcos(1.00000000000000002)).toEqual(1);
    });

    it('should return negative 1 if the value is greater than 1', () => {
        expect(robustAcos(-1.00000000000000002)).toEqual(-1);
    });

    it('should return the actual value if it is within positive and negative 1', () => {
        expect(robustAcos(Math.acos(0.75))).toEqual(Math.acos(0.75));
    });
});
