import getBounds from './getBounds';
import { GeolibInputCoordinates } from './types';

/*
 * Calculates the center of the bounds of geo coordinates.
 *
 * On polygons like political borders (eg. states) this may gives a closer
 * result to human expectation, than `getCenter`, because that function can be
 * disturbed by uneven distribution of point in different sides. Imagine the
 * US state Oklahoma: `getCenter` on that gives a southern point, because the
 * southern border contains a lot more nodes, than the others.
 */
const getCenterOfBounds = (coords: GeolibInputCoordinates[]) => {
    const bounds = getBounds(coords);
    const latitude = bounds.minLat + (bounds.maxLat - bounds.minLat) / 2;
    const longitude = bounds.minLng + (bounds.maxLng - bounds.minLng) / 2;
    return {
        latitude: parseFloat(latitude.toFixed(6)),
        longitude: parseFloat(longitude.toFixed(6)),
    };
};

export default getCenterOfBounds;
