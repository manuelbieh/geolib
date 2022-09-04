import getDistance from './getDistance';
import { GeolibInputCoordinates } from './types';

// Checks if a point is inside of given radius
const isPointWithinRadius = (
    point: GeolibInputCoordinates,
    center: GeolibInputCoordinates,
    radius: number
) => {
    const accuracy = 0.01;
    return getDistance(point, center, accuracy) < radius;
};

export default isPointWithinRadius;
