import { GeolibInputCoordinates, LongitudeKeys } from './types';
import { longitudeKeys } from './constants';
import getCoordinateKey from './getCoordinateKey';
import toDecimal from './toDecimal';

const getLongitude = (point: GeolibInputCoordinates, raw?: boolean) => {
    const latKey = getCoordinateKey(point, longitudeKeys);

    if (typeof latKey === 'undefined' || latKey === null) {
        return;
    }

    const value = point[latKey as keyof LongitudeKeys];

    return raw === true ? value : toDecimal(value);
};

export default getLongitude;
