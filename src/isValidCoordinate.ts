import { GeolibInputCoordinates, LongitudeKeys, LatitudeKeys } from './types';
import getCoordinateKeys from './getCoordinateKeys';
import isValidLatitude from './isValidLatitude';
import isValidLongitude from './isValidLongitude';

// Checks if a value contains a valid lat/lon object.
// A coordinate is considered valid if it contains at least a latitude
// and a longitude and both are either in decimals or sexagesimal format
const isValidCoordinate = (point: GeolibInputCoordinates) => {
    const { latitude, longitude } = getCoordinateKeys(point);

    if (Array.isArray(point) && point.length >= 2) {
        return isValidLongitude(point[0]) && isValidLatitude(point[1]);
    }

    if (latitude === undefined || longitude === undefined) {
        return false;
    }

    const lon: any = point[longitude as keyof LongitudeKeys];
    const lat: any = point[latitude as keyof LatitudeKeys];

    if (lat === undefined || lon === undefined) {
        return false;
    }

    return isValidLatitude(lat) && isValidLongitude(lon);
};

export default isValidCoordinate;
