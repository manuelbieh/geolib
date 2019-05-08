import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import toRad from './toRad';
import toDeg from './toDeg';
import { GeolibInputCoordinates } from './types';

/**
 * Gets great circle bearing of two points. See description of getRhumbLineBearing for more information
 */
const getGreatCircleBearing = (
    origin: GeolibInputCoordinates,
    dest: GeolibInputCoordinates
) => {
    const destLat = getLatitude(dest);
    const detLon = getLongitude(dest);
    const originLat = getLatitude(origin);
    const originLon = getLongitude(origin);

    const bearing =
        (toDeg(
            Math.atan2(
                Math.sin(toRad(detLon) - toRad(originLon)) *
                    Math.cos(toRad(destLat)),
                Math.cos(toRad(originLat)) * Math.sin(toRad(destLat)) -
                    Math.sin(toRad(originLat)) *
                        Math.cos(toRad(destLat)) *
                        Math.cos(toRad(detLon) - toRad(originLon))
            )
        ) +
            360) %
        360;

    return bearing;
};

export default getGreatCircleBearing;
