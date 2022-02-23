import isPointInBoundingBox from './isPointInBoundingBox';

describe('isPointInBoundingBox', () => {
    const box = {
        minlat: 52.5834829,
        minlon: 13.457756,
        maxlat: 52.5907111,
        maxlon: 13.4835132,
    };

    // TODO: add more tests e.g. ^to check across dateline
    it('should return true if a point is in a given box', () => {
        const point = { latitude: 52.5845163, longitude: 13.4671886 };
        expect(isPointInBoundingBox(point, box)).toBe(true);
    });

    it('should return false if a point is not in a given box', () => {
        // both points are outside the box
        const point1 = { latitude: 56.5845163, longitude: 10.4671886 };
        // longitude is outside the box
        const point2 = { latitude: 52.5845163, longitude: 10.4671886 };
        // latitude is outside the box
        const point3 = { latitude: 56.5845163, longitude: 13.4671886 };
        expect(isPointInBoundingBox(point1, box)).toBe(false);
        expect(isPointInBoundingBox(point2, box)).toBe(false);
        expect(isPointInBoundingBox(point3, box)).toBe(false);
    });
});
