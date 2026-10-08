import getDistance from './getDistance';
import { GeolibInputCoordinates } from './types';

type DistanceFn = (
    point: GeolibInputCoordinates,
    dest: GeolibInputCoordinates
) => number;

// Sorts an array of coords by distance from a reference coordinate. The
// points are returned as they were passed in, including extra properties.
const orderByDistance = <T extends GeolibInputCoordinates>(
    point: GeolibInputCoordinates,
    coords: T[],
    distanceFn: DistanceFn = getDistance
): T[] => {
    distanceFn = typeof distanceFn === 'function' ? distanceFn : getDistance;

    // Calculate every distance once instead of twice per comparison
    return coords
        .map((coord) => ({ coord, distance: distanceFn(point, coord) }))
        .sort((a, b) => a.distance - b.distance)
        .map(({ coord }) => coord);
};

export default orderByDistance;
