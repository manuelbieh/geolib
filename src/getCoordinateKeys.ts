import {
    GeolibInputCoordinates,
    LatitudeKeys,
    LongitudeKeys,
    AltitudeKeys,
} from './types';

import { longitudeKeys, latitudeKeys, altitudeKeys } from './constants';
import getCoordinateKey from './getCoordinateKey';

const getCoordinateKeys = (point: GeolibInputCoordinates) => {
    const longitude: LongitudeKeys | undefined = getCoordinateKey(
        point,
        longitudeKeys
    );

    const latitude: LatitudeKeys | undefined = getCoordinateKey(
        point,
        latitudeKeys
    );

    const altitude: AltitudeKeys | undefined = getCoordinateKey(
        point,
        altitudeKeys
    );

    return {
        latitude,
        longitude,
        ...(altitude ? { altitude } : {}),
    };
};

export default getCoordinateKeys;
