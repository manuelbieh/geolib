import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import toRad from './toRad';
import roundToAccuracy from './roundToAccuracy';
import { earthRadius } from './constants';
import { GeolibInputCoordinates } from './types';

// Calculates the great-circle distance between two points using the
// haversine formula. Simple and fast, but less accurate than
// getPreciseDistance because it treats the earth as a sphere.
const getDistance = (
    from: GeolibInputCoordinates,
    to: GeolibInputCoordinates,
    accuracy: number = 1
) => {
    const fromLat = toRad(getLatitude(from));
    const toLat = toRad(getLatitude(to));
    const sinHalfDeltaLat = Math.sin((toLat - fromLat) / 2);
    const sinHalfDeltaLon = Math.sin(
        toRad(getLongitude(to) - getLongitude(from)) / 2
    );

    const haversine =
        sinHalfDeltaLat * sinHalfDeltaLat +
        Math.cos(fromLat) * Math.cos(toLat) * sinHalfDeltaLon * sinHalfDeltaLon;

    // Rounding errors can push the value slightly above 1 for antipodal
    // points, which would make Math.asin return NaN
    const distance =
        2 * Math.asin(Math.sqrt(Math.min(1, haversine))) * earthRadius;

    return roundToAccuracy(distance, accuracy);
};

export default getDistance;
