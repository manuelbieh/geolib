import getDistance from './getDistance';
import robustAcos from './robustAcos';
import roundToAccuracy from './roundToAccuracy';
import { GeolibInputCoordinates } from './types';

// d1: line start to point, d2: point to line end, d3: line start to line end
const getMinimumDistance = (d1: number, d2: number, d3: number) => {
    const pointAtLineStart = d1 === 0;
    const pointAtLineEnd = d2 === 0;
    if (pointAtLineStart || pointAtLineEnd) {
        return 0;
    }

    const lineLengthZero = d3 === 0;
    if (lineLengthZero) {
        return d1;
    }

    // alpha is the angle between the line from start to point, and from start to end
    const alpha = Math.acos(
        robustAcos((d1 * d1 + d3 * d3 - d2 * d2) / (2 * d1 * d3))
    );

    // if the angle is greater than 90 degrees, then the minimum distance is the
    // line from the start to the point
    if (alpha > Math.PI / 2) {
        return d1;
    }

    // beta is the angle between the line from end to point and from end to start
    const beta = Math.acos(
        robustAcos((d2 * d2 + d3 * d3 - d1 * d1) / (2 * d2 * d3))
    );

    // same for the beta
    if (beta > Math.PI / 2) {
        return d2;
    }

    // otherwise the minimum distance is achieved through a line perpendicular
    // to the start-end line, which goes from the start-end line to the point
    return Math.sin(alpha) * d1;
};

// Returns the minimum distance from a point to a line
const getDistanceFromLine = (
    point: GeolibInputCoordinates,
    lineStart: GeolibInputCoordinates,
    lineEnd: GeolibInputCoordinates,
    accuracy: number = 1
) => {
    // Rounding the distances before using them in the calculation would
    // distort the result, especially for short lines. So only the result
    // is rounded.
    const distance = getMinimumDistance(
        getDistance(lineStart, point, 0),
        getDistance(point, lineEnd, 0),
        getDistance(lineStart, lineEnd, 0)
    );

    return roundToAccuracy(distance, accuracy);
};

export default getDistanceFromLine;
