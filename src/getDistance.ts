import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import toRad from './toRad';
import { earthRadius } from './constants';
import { GeolibInputCoordinates } from './types';

// Calculates the distance between two points.
// This method is simple but also more inaccurate
const getDistance = (
    from: GeolibInputCoordinates,
    to: GeolibInputCoordinates,
    accuracy: number = 1
) => {
    accuracy =
        typeof accuracy !== 'undefined' && !isNaN(accuracy) ? accuracy : 1;

    const fromLat = getLatitude(from);
    const fromLon = getLongitude(from);
    const toLat = getLatitude(to);
    const toLon = getLongitude(to);

    const distance =
        Math.acos(
            Math.sin(toRad(toLat)) * Math.sin(toRad(fromLat)) +
                Math.cos(toRad(toLat)) *
                    Math.cos(toRad(fromLat)) *
                    Math.cos(toRad(fromLon) - toRad(toLon))
        ) * earthRadius;

    return Math.round(distance / accuracy) * accuracy;
};

export default getDistance;
