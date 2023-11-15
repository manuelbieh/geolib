import findNearest from './findNearest';

describe('findNearest', () => {
    it('returns first result from orderByDistance', () => {
        const point = { latitude: 51.516241842, longitude: 7.456494328 };
        const nearest = { latitude: 51.515400598, longitude: 7.45518541 };
        const coords = [
            { latitude: 51.513357512, longitude: 7.45574331 },
            nearest,
            { latitude: 51.516722545, longitude: 7.459863183 },
            { latitude: 51.517443592, longitude: 7.463232037 },
        ];

        expect(findNearest(point, coords)).toEqual(nearest);
    });
});
