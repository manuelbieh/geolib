import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import toRad from './toRad';
import toDeg from './toDeg';
import { MAXLON, MINLON } from './constants';
import { GeolibInputCoordinates } from './types';

// Computes the destination point given an initial point, a distance and a bearing
// See http://www.movable-type.co.uk/scripts/latlong.html for the original code
const computeDestinationPoint = (
    start: GeolibInputCoordinates,
    distance: number,
    bearing: number,
    radius: number = 6371000
) => {
    const lat = getLatitude(start);
    const lng = getLongitude(start);

    const delta = distance / radius;
    const theta = toRad(bearing);

    const phi1 = toRad(lat);
    const lambda1 = toRad(lng);

    const phi2 = Math.asin(
        Math.sin(phi1) * Math.cos(delta) +
            Math.cos(phi1) * Math.sin(delta) * Math.cos(theta)
    );

    let lambda2 =
        lambda1 +
        Math.atan2(
            Math.sin(theta) * Math.sin(delta) * Math.cos(phi1),
            Math.cos(delta) - Math.sin(phi1) * Math.sin(phi2)
        );

    let longitude = toDeg(lambda2);
    if (longitude < MINLON || longitude > MAXLON) {
        // normalise to >=-180 and <=180° if value is >MAXLON or <MINLON
        lambda2 = ((lambda2 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
        longitude = toDeg(lambda2);
    }

    return {
        latitude: toDeg(phi2),
        longitude,
    };
};

export default computeDestinationPoint;
