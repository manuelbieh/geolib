import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import { GeolibInputCoordinates } from './types';

// Checks whether a point is inside of a polygon or not.
// Polygon must be in correct order!
const isPointInPolygon = (
    point: GeolibInputCoordinates,
    polygon: GeolibInputCoordinates[]
) => {
    let isInside = false;
    const totalPolys = polygon.length;
    for (let i = -1, j = totalPolys - 1; ++i < totalPolys; j = i) {
        if (
            ((getLongitude(polygon[i]) <= getLongitude(point) &&
                getLongitude(point) < getLongitude(polygon[j])) ||
                (getLongitude(polygon[j]) <= getLongitude(point) &&
                    getLongitude(point) < getLongitude(polygon[i]))) &&
            getLatitude(point) <
                ((getLatitude(polygon[j]) - getLatitude(polygon[i])) *
                    (getLongitude(point) - getLongitude(polygon[i]))) /
                    (getLongitude(polygon[j]) - getLongitude(polygon[i])) +
                    getLatitude(polygon[i])
        ) {
            isInside = !isInside;
        }
    }

    return isInside;
};

export default isPointInPolygon;
