import getDistance from './getDistance';
import { GeolibInputCoordinates, GeolibInputBoolean } from './types';

// Find all points inside of given radius
const findAllWithinRadius = (
    center: GeolibInputCoordinates,
    coords: GeolibInputCoordinates[],
    radius: number,
    exceptCenter: GeolibInputBoolean
) => {
    return coords.filter((point: GeolibInputCoordinates) => {
        const distance = getDistance(point, center);

        if(exceptCenter === true && distance === 0) return false;

        return distance < radius;
    })
};

export default findAllWithinRadius;
