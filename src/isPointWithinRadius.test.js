import isPointWithinRadius from './isPointWithinRadius';

describe('isPointWithinRadius', () => {
    it('should return true if a given point is within a certain radius', () => {
        expect(
            isPointWithinRadius(
                { latitude: 51.567, longitude: 7.456 },
                { latitude: 51.789, longitude: 7.678 },
                30000
            )
        ).toBe(true);
    });

    it('should return false if a given point is not within a certain radius', () => {
        expect(
            isPointWithinRadius(
                { latitude: 51.567, longitude: 7.456 },
                { latitude: 51.789, longitude: 7.678 },
                20000
            )
        ).toBe(false);
    });

    it('should return true if a given point is within a certain radius with high accuracy', () => {
        expect(
            isPointWithinRadius(
                { latitude: 42.53098, longitude: -71.28029 },
                { latitude: 42.53101, longitude: -71.2803986 },
                10
            )
        ).toBe(true);
    });

    it('should compare the unrounded distance', () => {
        const meterInDegrees = 1 / ((6378137 * Math.PI) / 180);
        const center = { latitude: 0, longitude: 0 };

        expect(
            isPointWithinRadius(
                { latitude: 0, longitude: 4999.996 * meterInDegrees },
                center,
                5000
            )
        ).toBe(true);
        expect(
            isPointWithinRadius(
                { latitude: 0, longitude: 5000.004 * meterInDegrees },
                center,
                5000
            )
        ).toBe(false);
    });
});
