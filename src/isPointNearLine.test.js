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
});
