import orderByDistance from './orderByDistance';
import { GeolibInputCoordinates } from './types';

// Finds the nearest coordinate to a reference coordinate
const findNearest = (
    point: GeolibInputCoordinates,
    coords: GeolibInputCoordinates[]
) => orderByDistance(point, coords)[0];

export default findNearest;
