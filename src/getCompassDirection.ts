import { GeolibInputCoordinates } from './types';
import getRhumbLineBearing from './getRhumbLineBearing';

type BearingFunction = (
    origin: GeolibInputCoordinates,
    dest: GeolibInputCoordinates
) => number;

// Gets the compass direction from an origin coordinate to a
// destination coordinate.
const getCompassDirection = (
    origin: GeolibInputCoordinates,
    dest: GeolibInputCoordinates,
    bearingFn: BearingFunction = getRhumbLineBearing
) => {
    const bearing =
        typeof bearingFn === 'function'
            ? bearingFn(origin, dest)
            : getRhumbLineBearing(origin, dest);

    if (isNaN(bearing)) {
        throw new Error(
            'Could not calculate bearing for given points. Check your bearing function'
        );
    }

    switch (Math.round(bearing / 22.5)) {
        case 1:
            return 'NNE';
        case 2:
            return 'NE';
        case 3:
            return 'ENE';
        case 4:
            return 'E';
        case 5:
            return 'ESE';
        case 6:
            return 'SE';
        case 7:
            return 'SSE';
        case 8:
            return 'S';
        case 9:
            return 'SSW';
        case 10:
            return 'SW';
        case 11:
            return 'WSW';
        case 12:
            return 'W';
        case 13:
            return 'WNW';
        case 14:
            return 'NW';
        case 15:
            return 'NNW';
        default:
            return 'N';
    }
};

export default getCompassDirection;
