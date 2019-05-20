import toRad from './toRad';
import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import { earthRadius } from './constants';
import { GeolibInputCoordinates } from './types';

// Calculates the surface area of a polygon.
const getAreaOfPolygon = (points: GeolibInputCoordinates[]) => {
    let area = 0;

    if (points.length > 2) {
        let lowerIndex;
        let middleIndex;
        let upperIndex;

        for (let i = 0; i < points.length; i++) {
            if (i === points.length - 2) {
                lowerIndex = points.length - 2;
                middleIndex = points.length - 1;
                upperIndex = 0;
            } else if (i === points.length - 1) {
                lowerIndex = points.length - 1;
                middleIndex = 0;
                upperIndex = 1;
            } else {
                lowerIndex = i;
                middleIndex = i + 1;
                upperIndex = i + 2;
            }

            const p1lon = getLongitude(points[lowerIndex]);
            const p2lat = getLatitude(points[middleIndex]);
            const p3lon = getLongitude(points[upperIndex]);

            area += (toRad(p3lon) - toRad(p1lon)) * Math.sin(toRad(p2lat));
        }

        area = (area * earthRadius * earthRadius) / 2;
    }

    return Math.abs(area);
};

export default getAreaOfPolygon;
