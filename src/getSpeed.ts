import getDistance from './getDistance';
import { GeolibInputCoordinatesWithTime, GeolibDistanceFn } from './types';

// Calculates the speed between two points within a given time span.
const getSpeed = (
    start: GeolibInputCoordinatesWithTime,
    end: GeolibInputCoordinatesWithTime,
    distanceFn: GeolibDistanceFn = getDistance
) => {
    const distance = distanceFn(start, end);
    const time = Number(end.time) - Number(start.time);
    const metersPerSecond = (distance / time) * 1000;
    return metersPerSecond;
};

export default getSpeed;
