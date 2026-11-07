import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import { GeolibInputCoordinates } from './types';

// Shifts a longitude difference by multiples of 360 degrees into
// [min, min + 360). Values that are already in range stay exactly as they are.
const wrapLongitude = (difference: number, min: number) => {
    if (difference >= min && difference < min + 360) {
        return difference;
    }

    return difference - Math.floor((difference - min) / 360) * 360;
};

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

    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        // An edge that spans more than 180 degrees of longitude (e.g. from
        // 175 to -175) is assumed to take the shorter way across the
        // antimeridian. Edges from -180 to 180 run along the antimeridian
        // and are left alone.
        let span = longitudes[j] - longitudes[i];
        if (span > 180 && span < 360) {
            span -= 360;
        } else if (span < -180 && span > -360) {
            span += 360;
        }

        if (span === 0) {
            continue;
        }

        // The point's longitude relative to vertex i, in the direction of
        // the edge: within [0, 360) for edges that run east and within
        // [-360, 0) for edges that run west. Each edge is looked at on its
        // own, so neither the antimeridian nor the order of the vertices
        // affects the result.
        const offset = wrapLongitude(
            longitude - longitudes[i],
            span > 0 ? 0 : -360
        );

        if (
            (span > 0 ? offset < span : offset >= span) &&
            latitude <
                ((latitudes[j] - latitudes[i]) * offset) / span + latitudes[i]
        ) {
            isInside = !isInside;
        }
    }

    return isInside;
};

export default isPointInPolygon;
