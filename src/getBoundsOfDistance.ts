import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import toRad from './toRad';
import toDeg from './toDeg';
import { earthRadius, MAXLAT, MINLAT, MAXLON, MINLON } from './constants';
import { GeolibInputCoordinates } from './types';

//  Computes the bounding coordinates of all points on the surface of the earth
//  less than or equal to the specified great circle distance.
const getBoundsOfDistance = (
    point: GeolibInputCoordinates,
    distance: number
) => {
    const latitude = getLatitude(point);
    const longitude = getLongitude(point);

    const radLat = toRad(latitude);
    const radLon = toRad(longitude);

    const radDist = distance / earthRadius;
    let minLat = radLat - radDist;
    let maxLat = radLat + radDist;

    const MAX_LAT_RAD = toRad(MAXLAT);
    const MIN_LAT_RAD = toRad(MINLAT);
    const MAX_LON_RAD = toRad(MAXLON);
    const MIN_LON_RAD = toRad(MINLON);

    let minLon;
    let maxLon;

    if (minLat > MIN_LAT_RAD && maxLat < MAX_LAT_RAD) {
        const deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
        minLon = radLon - deltaLon;

        if (minLon < MIN_LON_RAD) {
            minLon += Math.PI * 2;
        }

        maxLon = radLon + deltaLon;

        if (maxLon > MAX_LON_RAD) {
            maxLon -= Math.PI * 2;
        }
    } else {
        // A pole is within the distance.
        minLat = Math.max(minLat, MIN_LAT_RAD);
        maxLat = Math.min(maxLat, MAX_LAT_RAD);
        minLon = MIN_LON_RAD;
        maxLon = MAX_LON_RAD;
    }

    return [
        // Southwest
        {
            latitude: toDeg(minLat),
            longitude: toDeg(minLon),
        },
        // Northeast
        {
            latitude: toDeg(maxLat),
            longitude: toDeg(maxLon),
        },
    ];
};

export default getBoundsOfDistance;
