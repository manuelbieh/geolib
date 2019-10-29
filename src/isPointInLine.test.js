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
});
