import isValidCoordinate from './isValidCoordinate';

describe('isValidCoordinate', () => {
    it('checks if a coordinate has at least a latitude and a longitude', () => {
        expect(isValidCoordinate({ lat: 1, lng: 1 })).toBe(true);
        expect(isValidCoordinate({ lat: 1, lon: 1 })).toBe(true);
        expect(isValidCoordinate({ lat: 1 })).toBe(false);
        expect(isValidCoordinate({ lat: 1 })).toBe(false);
    });
    it('checks if values for latitude and longitude are valid', () => {
        expect(
            isValidCoordinate({ lat: "51° 31.52'", lng: '7° 28\' 01"' })
        ).toBe(true);
        expect(isValidCoordinate({ lat: 'invalid', lng: 1 })).toBe(false);
    });
});
