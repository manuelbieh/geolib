import getDistance from './getDistance';
import getBoundsOfDistance from './getBoundsOfDistance';

describe('getBoundsOfDistance', () => {
    it('should return the topmost north, east, south and west points for a given distance', () => {
        const point = { latitude: 34.090166, longitude: -118.276736555556 };
        const bounds1000meters = getBoundsOfDistance(point, 1000);
        expect(bounds1000meters).toEqual([
            { latitude: 34.08118284715881, longitude: -118.28758372313425 },
            { latitude: 34.0991491528412, longitude: -118.26588938797775 },
        ]);
    });

    it('should correctly calculate the given distance for the returned bounds', () => {
        const point = { latitude: 34.090166, longitude: -118.276736555556 };
        const bounds1000meters = getBoundsOfDistance(point, 1000);
        expect(bounds1000meters).toEqual([
            { latitude: 34.08118284715881, longitude: -118.28758372313425 },
            { latitude: 34.0991491528412, longitude: -118.26588938797775 },
        ]);

        const north = {
            latitude: bounds1000meters[1].latitude,
            longitude: point.longitude,
        };
        const east = {
            latitude: point.latitude,
            longitude: bounds1000meters[1].longitude,
        };
        const south = {
            latitude: bounds1000meters[0].latitude,
            longitude: point.longitude,
        };
        const west = {
            latitude: point.latitude,
            longitude: bounds1000meters[0].longitude,
        };

        expect(getDistance(point, north)).toBe(1000);
        expect(getDistance(point, east)).toBe(1000);
        expect(getDistance(point, south)).toBe(1000);
        expect(getDistance(point, west)).toBe(1000);
    });
});
