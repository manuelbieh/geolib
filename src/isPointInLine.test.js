import isPointInLine from './isPointInLine';

describe('isPointInLine', () => {
    it('should return true if a point is in a given line', () => {
        const point1 = { latitude: 0.5, longitude: 0 };
        const point2 = { latitude: 0, longitude: 10 };
        const point3 = { latitude: 0, longitude: 15.5 };
        const start = { latitude: 0, longitude: 0 };
        const end = { latitude: 0, longitude: 15 };

        expect(isPointInLine(point1, start, end)).toBe(false);
        expect(isPointInLine(point2, start, end)).toBe(true);
        expect(isPointInLine(point3, start, end)).toBe(false);
    });

    it('should return false for a point next to a long line', () => {
        // https://github.com/manuelbieh/geolib/issues/237
        // The point is about 81 meters away from the line
        expect(
            isPointInLine(
                { latitude: 41.61884689, longitude: 24.66986465 },
                { latitude: 41.6166666286222, longitude: 24.5994927167 },
                { latitude: 41.6191097253556, longitude: 24.7194241952577 }
            )
        ).toBe(false);
    });

    it('should return true for a point on a line regardless of rounding', () => {
        // Rounded to meters, 100.4 + 100.4 is not equal to 200.8
        const meterInDegrees = 1 / ((6378137 * Math.PI) / 180);

        expect(
            isPointInLine(
                { latitude: 0, longitude: 100.4 * meterInDegrees },
                { latitude: 0, longitude: 0 },
                { latitude: 0, longitude: 200.8 * meterInDegrees }
            )
        ).toBe(true);
    });
});
