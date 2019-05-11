import getPreciseDistance from './getPreciseDistance';

describe('getPreciseDistance', () => {
    it('should calculate the precise distance between any two points', () => {
        expect(
            getPreciseDistance(
                { latitude: 52.518611, longitude: 13.408056 },
                { latitude: 51.519475, longitude: 7.46694444 }
            )
        ).toEqual(422592);

        expect(
            getPreciseDistance(
                { latitude: 52.518611, longitude: 13.408056 },
                { latitude: 51.519475, longitude: 7.46694444 },
                100
            )
        ).toEqual(422600);

        expect(
            getPreciseDistance(
                { latitude: 37.774514, longitude: -122.418079 },
                { latitude: 51.519475, longitude: 7.46694444 }
            )
        ).toEqual(8980260);

        expect(
            getPreciseDistance(
                [-122.418079, 37.774514],
                [7.46694444, 51.519475]
            )
        ).toEqual(8980260);
    });

    it('should return 0 if two identical points are given', () => {
        expect(
            getPreciseDistance(
                { latitude: 51.516241843, longitude: 7.456494328 },
                { latitude: 51.516241843, longitude: 7.456494328 }
            )
        ).toBe(0);

        expect(
            getPreciseDistance(
                { latitude: 51.516241842, longitude: 7.456494328 },
                { latitude: 51.516241842, longitude: 7.456494328 }
            )
        ).toBe(0);
    });
});
