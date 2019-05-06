import { GeolibInputCoordinates, GeolibGeoJSONPoint } from './types';
import getCoordinateKeys from './getCoordinateKeys';
import isDecimal from './isDecimal';
import isSexagesimal from './isSexagesimal';
import getDecimal from './getDecimal';
import { minLat, maxLat, minLon, maxLon } from './constants';

type LongitudeKeys = 'lon' | 'lng' | 'longitude' | 0;

// checks if a value contains a valid latlong object
const validate = (point: GeolibInputCoordinates) => {
    const { latitude, longitude } = getCoordinateKeys(point);

    if (!latitude || !longitude) {
        return false;
    }

    let lat = point[latitude];
    let lng = point[longitude];

    if (
        typeof lat === 'undefined' ||
        (!isDecimal(lat) && !isSexagesimal(lat))
    ) {
        return false;
    }

    if (
        typeof lng === 'undefined' ||
        (!isDecimal(lng) && !isSexagesimal(lng))
    ) {
        return false;
    }

    lat = getDecimal(lat);
    lng = getDecimal(lng);

    if (lat < minLat || lat > maxLat || lng < minLon || lng > maxLon) {
        return false;
    }

    return true;
};

export default validate;
