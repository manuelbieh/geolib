import getDistanceFromLine from './getDistanceFromLine';
import { GeolibInputCoordinates } from './types';

// Check if a point lies within a given distance from a line created by two
// other points
const isPointNearLine = (
    point: GeolibInputCoordinates,
    start: GeolibInputCoordinates,
    end: GeolibInputCoordinates,
    distance: number
) => getDistanceFromLine(point, start, end) < distance;

export default isPointNearLine;
