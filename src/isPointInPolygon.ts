import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import { GeolibInputCoordinates } from './types';

// Checks whether a point is inside of a polygon or not.
// The vertices must be ordered along the outline of the polygon, either
// clockwise or counterclockwise.
const isPointInPolygon = (
    point: GeolibInputCoordinates,
    polygon: GeolibInputCoordinates[]
) => {
    const latitude = getLatitude(point);
    const longitude = getLongitude(point);

    // Reading coordinates is relatively expensive because they need to be
    // looked up and converted, so each vertex is only read once
    const latitudes = polygon.map((vertex) => getLatitude(vertex));
    const longitudes = polygon.map((vertex) => getLongitude(vertex));

    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        if (
            ((longitudes[i] <= longitude && longitude < longitudes[j]) ||
                (longitudes[j] <= longitude && longitude < longitudes[i])) &&
            latitude <
                ((latitudes[j] - latitudes[i]) * (longitude - longitudes[i])) /
                    (longitudes[j] - longitudes[i]) +
                    latitudes[i]
        ) {
            isInside = !isInside;
        }
    }

    return isInside;
};

export default isPointInPolygon;
