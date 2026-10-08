import orderByDistance from './orderByDistance';
import { GeolibInputCoordinates } from './types';

// Finds the nearest coordinate to a reference coordinate
const findNearest = <T extends GeolibInputCoordinates>(
    point: GeolibInputCoordinates,
    coords: T[]
): T => orderByDistance(point, coords)[0];

export default findNearest;
