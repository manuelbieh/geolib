import getDistance from './getDistance';

describe('getDistance', () => {
    it('should calculate the distance between any two points', () => {
        expect(
            getDistance(
                { latitude: 52.518611, longitude: 13.408056 },
                { latitude: 51.519475, longitude: 7.46694444 }
            )
        ).toEqual(421786);

        expect(
            getDistance(
                { latitude: 52.518611, longitude: 13.408056 },
                { latitude: 51.519475, longitude: 7.46694444 },
                100
            )
        ).toEqual(421800);

        expect(
            getDistance(
                { latitude: 37.774514, longitude: -122.418079 },
                { latitude: 51.519475, longitude: 7.46694444 }
            )
        ).toEqual(8967172);

        expect(
            getDistance([-122.418079, 37.774514], [7.46694444, 51.519475])
        ).toEqual(8967172);
    });

    it('should return 0 if two identical points are given', () => {
        expect(
            getDistance(
                { latitude: 51.516241843, longitude: 7.456494328 },
                { latitude: 51.516241843, longitude: 7.456494328 }
            )
        ).toBe(0);

        expect(
            getDistance(
                { latitude: 51.516241842, longitude: 7.456494328 },
                { latitude: 51.516241842, longitude: 7.456494328 }
            )
        ).toBe(0);
    });

    it('should not round the distance if accuracy is 0', () => {
        // https://github.com/manuelbieh/geolib/issues/306
        expect(
            getDistance(
                { latitude: 52.518611, longitude: 13.408056 },
                { latitude: 51.519475, longitude: 7.46694444 },
                0
            )
        ).toBeCloseTo(421786.463698, 5);
    });

    it('should be precise for very short distances', () => {
        // One centimeter along the equator
        const oneCentimeterInDegrees = 0.01 / ((6378137 * Math.PI) / 180);
        expect(
            getDistance(
                { latitude: 0, longitude: 0 },
                { latitude: 0, longitude: oneCentimeterInDegrees },
                0
            )
        ).toBeCloseTo(0.01, 9);
    });

    it('should return half the circumference for antipodal points', () => {
        expect(getDistance([0, 0], [180, 0], 0)).toBeCloseTo(
            6378137 * Math.PI,
            6
        );
        expect(getDistance([10, 45], [-170, -45], 0)).toBeCloseTo(
            6378137 * Math.PI,
            6
        );
    });
});
