import isPointNearLine from './isPointNearLine';

describe('isPointNearLine', () => {
    it('should get the shortest distance from a point to a line of two points', () => {
        expect(
            isPointNearLine(
                { latitude: 51.516, longitude: 7.456 },
                { latitude: 51.512, longitude: 7.456 },
                { latitude: 51.516, longitude: 7.459 },
                200
            )
        ).toBe(true);
    });

    it('should compare the unrounded distance', () => {
        const meterInDegrees = 1 / ((6378137 * Math.PI) / 180);
        const point = { latitude: 9.7 * meterInDegrees, longitude: 0 };
        const lineStart = { latitude: 0, longitude: -meterInDegrees };
        const lineEnd = { latitude: 0, longitude: meterInDegrees };

        expect(isPointNearLine(point, lineStart, lineEnd, 10)).toBe(true);
        expect(isPointNearLine(point, lineStart, lineEnd, 9.6)).toBe(false);
    });
});
