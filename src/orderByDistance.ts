import getDistance from './getDistance';
import { GeolibInputCoordinates } from './types';

type DistanceFn = (
    point: GeolibInputCoordinates,
    dest: GeolibInputCoordinates
) => number;

// Sorts an array of coords by distance from a reference coordinate
const orderByDistance = <T extends GeolibInputCoordinates>(
    point: GeolibInputCoordinates,
    coords: T[],
    distanceFn: DistanceFn = getDistance
) => {
    distanceFn = typeof distanceFn === 'function' ? distanceFn : getDistance;

    return coords
        .slice()
        .sort((a, b) => distanceFn(point, a) - distanceFn(point, b));
};

export default orderByDistance;
