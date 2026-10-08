import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import { GeolibBounds, GeolibInputCoordinates } from './types';

// Checks whether a point is inside of a bounding box like the one returned
// by getBounds. If minLng is greater than maxLng, the bounding box is
// considered to cross the antimeridian.
const isPointInBoundingBox = (
    point: GeolibInputCoordinates,
    bounds: GeolibBounds
) => {
    const latitude = getLatitude(point);
    const longitude = getLongitude(point);

    const isWithinLatitude =
        latitude >= bounds.minLat && latitude <= bounds.maxLat;

    const isWithinLongitude =
        bounds.minLng <= bounds.maxLng
            ? longitude >= bounds.minLng && longitude <= bounds.maxLng
            : longitude >= bounds.minLng || longitude <= bounds.maxLng;

    return isWithinLatitude && isWithinLongitude;
};

export default isPointInBoundingBox;
