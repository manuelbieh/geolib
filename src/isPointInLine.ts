import getDistanceFromLine from './getDistanceFromLine';
import { GeolibInputCoordinates } from './types';

// Checks if a point lies on the line between two other points. Floating
// point calculations are never exact, so the point counts as being on the
// line if its distance to it rounds to 0 meters. Use isPointNearLine for
// a different tolerance.
const isPointInLine = (
    point: GeolibInputCoordinates,
    lineStart: GeolibInputCoordinates,
    lineEnd: GeolibInputCoordinates
) => getDistanceFromLine(point, lineStart, lineEnd) === 0;

export default isPointInLine;
