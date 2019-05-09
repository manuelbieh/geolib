import getDistance from './getDistance';
import { GeolibInputCoordinates } from './types';

type DistanceFn = (
    point: GeolibInputCoordinates,
    dest: GeolibInputCoordinates
) => number;

type Accumulated = {
    last: GeolibInputCoordinates | null;
    distance: number;
};

// Calculates the length of a given path
const getPathLength = (
    points: GeolibInputCoordinates[],
    distanceFn: DistanceFn = getDistance
) => {
    return points.reduce(
        (acc: Accumulated, point: GeolibInputCoordinates) => {
            if (typeof acc === 'object' && acc.last !== null) {
                acc.distance += distanceFn(point, acc.last);
            }
            acc.last = point;
            return acc;
        },
        { last: null, distance: 0 }
    ).distance;
};

export default getPathLength;
