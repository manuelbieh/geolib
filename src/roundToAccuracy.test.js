import roundToAccuracy from './roundToAccuracy';

describe('roundToAccuracy', () => {
    it('rounds to the nearest multiple of the accuracy', () => {
        expect(roundToAccuracy(25428, 100)).toBe(25400);
        expect(roundToAccuracy(25428.6, 1)).toBe(25429);
    });

    it('returns the value as it is if accuracy is 0', () => {
        expect(roundToAccuracy(25428.6, 0)).toBe(25428.6);
    });

    it('rounds to meters if accuracy is not a number', () => {
        expect(roundToAccuracy(25428.6, NaN)).toBe(25429);
    });
});
