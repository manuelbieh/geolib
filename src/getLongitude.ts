import { GeolibInputCoordinates, LongitudeKeys } from './types';
import { longitudeKeys } from './constants';
import getCoordinateKey from './getCoordinateKey';
import toDecimal from './toDecimal';

const getLongitude = (point: GeolibInputCoordinates, raw?: boolean) => {
    const lonKey = getCoordinateKey(point, longitudeKeys);

    if (lonKey === undefined || lonKey === null) {
        return;
    }

    const value = point[lonKey as keyof LongitudeKeys];

    return raw === true ? value : toDecimal(value);
};

export default getLongitude;
