import orderByDistance from './orderByDistance';

describe('orderByDistance', () => {
    it('should sort an array of coords based on distance to an origin point', () => {
        expect(
            orderByDistance(
                { latitude: 51.516241842, longitude: 7.456494328 },
                [
                    { latitude: 51.513357512, longitude: 7.45574331 },
                    { latitude: 51.515400598, longitude: 7.45518541 },
                    { latitude: 51.516722545, longitude: 7.459863183 },
                    { latitude: 51.517443592, longitude: 7.463232037 },
                ]
            )
        ).toEqual([
            { latitude: 51.515400598, longitude: 7.45518541 },
            { latitude: 51.516722545, longitude: 7.459863183 },
            { latitude: 51.513357512, longitude: 7.45574331 },
            { latitude: 51.517443592, longitude: 7.463232037 },
        ]);

        expect(
            orderByDistance({ latitude: 1, longitude: 1 }, [
                [1, 74],
                [1, 15],
                [1, 12],
                [1, 2],
                [1, 37],
                [1, 4],
            ])
        ).toEqual([[1, 2], [1, 4], [1, 12], [1, 15], [1, 37], [1, 74]]);
    });

    it('should use an optional getDistance function', () => {
        const origin = [1, 1];
        const dest = [[30, 28], [5, 0], [20, 17], [40, 39], [10, 6]];
        const subtractLatFromLon = (origin, dest) => dest[0] - dest[1];
        expect(orderByDistance(origin, dest, subtractLatFromLon)).toEqual([
            [40, 39],
            [30, 28],
            [20, 17],
            [10, 6],
            [5, 0],
        ]);
    });
});
