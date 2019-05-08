import { GeolibInputCoordinates } from 'types';
import getDistance from './getDistance';

// Checks if a point is inside of given radius
const isPointWithinRadius = (
    point: GeolibInputCoordinates,
    center: GeolibInputCoordinates,
    radius: number
) => {
    return getDistance(point, center) < radius;
};

export default isPointWithinRadius;
