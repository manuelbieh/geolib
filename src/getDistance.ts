import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import toRad from './toRad';
import robustAcos from './robustAcos';
import { earthRadius } from './constants';
import { GeolibInputCoordinates } from './types';

// Calculates the distance between two points.
// This method is simple but also more inaccurate
const getDistance = (
    from: GeolibInputCoordinates,
    to: GeolibInputCoordinates,
    accuracy: number = 1
) => {
    accuracy = !isNaN(accuracy) ? accuracy : 1;

    const fromLat = toRad(getLatitude(from));
    const toLat = toRad(getLatitude(to));
    const deltaLon = toRad(getLongitude(from) - getLongitude(to));

    const distance =
        Math.acos(
            robustAcos(
                Math.sin(toLat) * Math.sin(fromLat) +
                    Math.cos(toLat) * Math.cos(fromLat) * Math.cos(deltaLon)
            )
        ) * earthRadius;

    return Math.round(distance / accuracy) * accuracy;
};

export default getDistance;
