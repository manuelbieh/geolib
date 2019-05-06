import { GeolibInputCoordinates } from './types';

type LongitudeKeys = 'lon' | 'lng' | 'longitude' | 0;
type LatitudeKeys = 'lat' | 'latitude' | 1;
type AltitudeKeys = 'alt' | 'altitude' | 'elevation' | 'elev' | 2;

const getCoordinateKey = <Keys>(
    point: GeolibInputCoordinates,
    possibleValues: Keys[]
) => {
    return possibleValues.reduce((acc: Keys | undefined, value: any):
        | Keys
        | undefined => {
        if (point.hasOwnProperty(value) && typeof value !== 'undefined') {
            acc = value;
            return value;
        }
        return acc;
    }, undefined);
};

type CoordinateKeys = {
    longitude: LongitudeKeys | undefined;
    latitude: LatitudeKeys | undefined;
    altitude?: AltitudeKeys | undefined;
};

const getCoordinateKeys = (point: GeolibInputCoordinates): CoordinateKeys => {
    if (Array.isArray(point)) {
        return {
            longitude: 0,
            latitude: 1,
            ...(point.length === 3 ? { altitude: 2 } : {}),
        };
    }

    const longitude: LongitudeKeys | undefined = getCoordinateKey(point, [
        'lng',
        'lon',
        'longitude',
    ]);
    const latitude: LatitudeKeys | undefined = getCoordinateKey(point, [
        'lat',
        'latitude',
    ]);
    const altitude: AltitudeKeys | undefined = getCoordinateKey(point, [
        'alt',
        'altitude',
        'elevation',
        'elev',
    ]);

    return {
        latitude,
        longitude,
        ...(altitude ? { altitude } : {}),
    };
};
