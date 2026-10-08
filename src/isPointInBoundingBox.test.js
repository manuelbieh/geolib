import getBounds from './getBounds';
import isPointInBoundingBox from './isPointInBoundingBox';

describe('isPointInBoundingBox', () => {
    const bounds = {
        minLat: 52.5834829,
        maxLat: 52.5907111,
        minLng: 13.457756,
        maxLng: 13.4835132,
    };

    it('should return true if a point is inside of the bounding box', () => {
        expect(
            isPointInBoundingBox(
                { latitude: 52.5845163, longitude: 13.4671886 },
                bounds
            )
        ).toBe(true);
    });

    it('should return false if a point is outside of the bounding box', () => {
        // latitude and longitude outside
        expect(
            isPointInBoundingBox(
                { latitude: 56.5845163, longitude: 10.4671886 },
                bounds
            )
        ).toBe(false);
        // only longitude outside
        expect(
            isPointInBoundingBox(
                { latitude: 52.5845163, longitude: 10.4671886 },
                bounds
            )
        ).toBe(false);
        // only latitude outside
        expect(
            isPointInBoundingBox(
                { latitude: 56.5845163, longitude: 13.4671886 },
                bounds
            )
        ).toBe(false);
    });

    it('should include the edges of the bounding box', () => {
        expect(
            isPointInBoundingBox(
                { latitude: bounds.minLat, longitude: bounds.maxLng },
                bounds
            )
        ).toBe(true);
    });

    it('should work with the result of getBounds and any coordinate format', () => {
        const polygonBounds = getBounds([
            [7.4, 51.5],
            [7.6, 51.6],
        ]);

        expect(isPointInBoundingBox([7.5, 51.55], polygonBounds)).toBe(true);
        expect(
            isPointInBoundingBox({ lat: "51° 33' N", lng: 7.5 }, polygonBounds)
        ).toBe(true);
        expect(isPointInBoundingBox([7.7, 51.55], polygonBounds)).toBe(false);
    });

    it('should cross the antimeridian if minLng is greater than maxLng', () => {
        const pacific = { minLat: -10, maxLat: 10, minLng: 170, maxLng: -170 };

        expect(isPointInBoundingBox([175, 0], pacific)).toBe(true);
        expect(isPointInBoundingBox([-175, 0], pacific)).toBe(true);
        expect(isPointInBoundingBox([180, 0], pacific)).toBe(true);
        expect(isPointInBoundingBox([0, 0], pacific)).toBe(false);
        expect(isPointInBoundingBox([160, 0], pacific)).toBe(false);
        expect(isPointInBoundingBox([175, 20], pacific)).toBe(false);
    });
});
