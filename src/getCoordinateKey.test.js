import getCoordinateKey from './getCoordinateKey';

describe('getCoordinateKey', () => {
    it('should get the correct key out of a list of keys', () => {
        expect(
            getCoordinateKey({ lat: 1, lng: 1 }, ['latitude', 'lat'])
        ).toEqual('lat');
    });

    it('should return the first match from the lookup array only', () => {
        expect(
            getCoordinateKey({ lat: 1, latitude: 1 }, ['latitude', 'lat'])
        ).toEqual('latitude');
    });

    it('should return an index of a GeoJSON array', () => {
        expect(getCoordinateKey([1, 2], ['latitude', 'lat', 0])).toEqual(0);
    });

    it('should throw when an invalid coordinate is passed', () => {
        expect(() => getCoordinateKey(null, ['latitude', 'lat', 0])).toThrow();
        expect(() =>
            getCoordinateKey(undefined, ['latitude', 'lat', 0])
        ).toThrow();
    });
});
