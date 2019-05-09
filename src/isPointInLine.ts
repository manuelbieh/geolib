import getDistance from './getDistance';
import { GeolibInputCoordinates } from './types';

// Check if a point lies in line created by two other points
const isPointInLine = (
    point: GeolibInputCoordinates,
    lineStart: GeolibInputCoordinates,
    lineEnd: GeolibInputCoordinates
) => {
    return (
        getDistance(lineStart, point) + getDistance(point, lineEnd) ===
        getDistance(lineStart, lineEnd)
    );
};

export default isPointInLine;
