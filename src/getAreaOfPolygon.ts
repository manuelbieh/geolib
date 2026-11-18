import toRad from './toRad';
import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import { earthRadius } from './constants';
import { GeolibInputCoordinates } from './types';

// Calculates the surface area of a polygon. Polygons may cross the
// antimeridian.
const getAreaOfPolygon = (points: GeolibInputCoordinates[]) => {
    if (points.length < 3) {
        return 0;
    }

    const latitudes = points.map((point) => toRad(getLatitude(point)));
    const longitudes = points.map((point) => getLongitude(point));

    let area = 0;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        // An edge that spans more than 180 degrees of longitude (e.g. from
        // 175 to -175) is assumed to take the shorter way across the
        // antimeridian, like in isPointInPolygon. Edges from -180 to 180 run
        // along the antimeridian and are left alone.
        let span = longitudes[i] - longitudes[j];
        if (span > 180 && span < 360) {
            span -= 360;
        } else if (span < -180 && span > -360) {
            span += 360;
        }

        area += toRad(span) * (Math.sin(latitudes[j]) + Math.sin(latitudes[i]));
    }

    return Math.abs((area * earthRadius * earthRadius) / 2);
};

export default getAreaOfPolygon;
