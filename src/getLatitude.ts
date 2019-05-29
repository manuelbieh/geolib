import { GeolibInputCoordinates, LatitudeKeys } from './types';
import { latitudeKeys } from './constants';
import getCoordinateKey from './getCoordinateKey';
import toDecimal from './toDecimal';

const getLatitude = (point: GeolibInputCoordinates, raw?: boolean) => {
    const latKey = getCoordinateKey(point, latitudeKeys);

    if (typeof latKey === 'undefined' || latKey === null) {
        return;
    }

    const value = point[latKey as keyof LatitudeKeys];

    return raw === true ? value : toDecimal(value);
};

export default getLatitude;
