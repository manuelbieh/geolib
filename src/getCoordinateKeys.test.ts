import getCoordinateKeys from './getCoordinateKeys';

describe('getCoordinateKeys', () => {
    it('gets lat/lng[/alt]', () => {
        expect(getCoordinateKeys({ lat: 1, lng: 1 })).toEqual({
            longitude: 'lng',
            latitude: 'lat',
        });
        expect(getCoordinateKeys({ lat: 1, lng: 1, alt: 1 })).toEqual({
            longitude: 'lng',
            latitude: 'lat',
            altitude: 'alt',
        });
    });

    it('gets lat/lon[/alt]', () => {
        expect(getCoordinateKeys({ lat: 1, lon: 1 })).toEqual({
            longitude: 'lon',
            latitude: 'lat',
        });
        expect(getCoordinateKeys({ lat: 1, lon: 1, alt: 1 })).toEqual({
            longitude: 'lon',
            latitude: 'lat',
            altitude: 'alt',
        });
    });

    it('gets latitude/longitude[/altitude]', () => {
        expect(getCoordinateKeys({ latitude: 1, longitude: 1 })).toEqual({
            longitude: 'longitude',
            latitude: 'latitude',
        });
        expect(
            getCoordinateKeys({ latitude: 1, longitude: 1, altitude: 1 })
        ).toEqual({
            longitude: 'longitude',
            latitude: 'latitude',
            altitude: 'altitude',
        });
    });

    it('gets GeoJSON array', () => {
        expect(getCoordinateKeys([1, 2])).toEqual({
            longitude: 0,
            latitude: 1,
        });
        expect(getCoordinateKeys([1, 2, 3])).toEqual({
            longitude: 0,
            latitude: 1,
            altitude: 2,
        });
    });
});
