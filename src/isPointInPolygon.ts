import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import { GeolibInputCoordinates } from './types';

// Checks whether a point is inside of a polygon or not.
// The vertices must be ordered along the outline of the polygon, either
// clockwise or counterclockwise. Polygons may cross the antimeridian.
const isPointInPolygon = (
    point: GeolibInputCoordinates,
    polygon: GeolibInputCoordinates[]
) => {
    // Reading coordinates is relatively expensive because they need to be
    // looked up and converted, so each vertex is only read once
    const latitudes = polygon.map((vertex) => getLatitude(vertex));
    const longitudes = polygon.map((vertex) => getLongitude(vertex));

    const latitude = getLatitude(point);
    const longitude = getLongitude(point);

    // An edge that spans more than 180 degrees of longitude (e.g. from 175
    // to -175) is assumed to take the shorter way across the antimeridian.
    // Each vertex is shifted by a multiple of 360 degrees so that it lies
    // within 180 degrees of the previous one, which makes such a polygon
    // continuous (175 to 185) and leaves all other edges, e.g. those that
    // cross the prime meridian, as they are. Edges from -180 to 180 run
    // along the antimeridian and are left alone.
    let offset = 0;
    let previous = longitudes[0];
    let west = longitudes[0];
    let east = longitudes[0];
    for (let i = 1; i < longitudes.length; i++) {
        const current = longitudes[i];
        const delta = current - previous;
        if (delta > 180 && delta < 360) {
            offset -= 360;
        } else if (delta < -180 && delta > -360) {
            offset += 360;
        }
        previous = current;
        longitudes[i] = current + offset;
        west = Math.min(west, longitudes[i]);
        east = Math.max(east, longitudes[i]);
    }

    // The shifted polygon can extend beyond -180 or 180 degrees, so the
    // point is tested at each of its equivalent longitudes (its own plus or
    // minus multiples of 360 degrees) within the polygon's range.
    for (
        let lon = longitude - Math.floor((longitude - west) / 360) * 360;
        lon <= east;
        lon += 360
    ) {
        let isInside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            if (
                ((longitudes[i] <= lon && lon < longitudes[j]) ||
                    (longitudes[j] <= lon && lon < longitudes[i])) &&
                latitude <
                    ((latitudes[j] - latitudes[i]) * (lon - longitudes[i])) /
                        (longitudes[j] - longitudes[i]) +
                        latitudes[i]
            ) {
                isInside = !isInside;
            }
        }

        if (isInside) {
            return true;
        }
    }

    return false;
};

export default isPointInPolygon;
