import {
    GeolibInputCoordinates,
    LatitudeKeys,
    LongitudeKeys,
    AltitudeKeys,
} from './types';

import { longitudeKeys, latitudeKeys, altitudeKeys } from './constants';
import getCoordinateKey from './getCoordinateKey';

// TODO: add second parameter that can be passed as keysToLookup to getCoordinateKey
// e.g. { latitude: ['lat', 'latitude'], longitude: ['lon', 'longitude']}
const getCoordinateKeys = (
    point: GeolibInputCoordinates,
    keysToLookup = {
        longitude: longitudeKeys,
        latitude: latitudeKeys,
        altitude: altitudeKeys,
    }
) => {
    const longitude: LongitudeKeys | undefined = getCoordinateKey(
        point,
        keysToLookup.longitude
    );

    const latitude: LatitudeKeys | undefined = getCoordinateKey(
        point,
        keysToLookup.latitude
    );

    const altitude: AltitudeKeys | undefined = getCoordinateKey(
        point,
        keysToLookup.altitude
    );

    return {
        latitude,
        longitude,
        ...(altitude ? { altitude } : {}),
    };
};

export default getCoordinateKeys;
