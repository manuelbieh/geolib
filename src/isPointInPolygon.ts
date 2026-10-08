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
    let longitudes = polygon.map((vertex) => getLongitude(vertex));

    const latitude = getLatitude(point);
    let longitude = getLongitude(point);

    // An edge that spans more than 180 degrees of longitude (e.g. from 175
    // to -175) is assumed to take the shorter way across the antimeridian.
    // Shifting western longitudes by 360 degrees makes such a polygon
    // continuous (175 to 185). Edges from -180 to 180 run along the
    // antimeridian and are left alone.
    const crossesAntimeridian = longitudes.some((lon, i) => {
        const span = Math.abs(lon - longitudes[(i + 1) % longitudes.length]);
        return span > 180 && span < 360;
    });

    if (crossesAntimeridian) {
        const shift = (lon: number) => (lon < 0 ? lon + 360 : lon);
        longitudes = longitudes.map(shift);
        longitude = shift(longitude);
    }

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
