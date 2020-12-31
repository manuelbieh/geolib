import {
    GeolibInputCoordinates,
    GeolibLongitudeInputValue,
    LongitudeKeys,
} from './types';
import { longitudeKeys } from './constants';
import getCoordinateKey from './getCoordinateKey';
import toDecimal from './toDecimal';

function getLongitude(point: GeolibInputCoordinates): number;
function getLongitude(
    point: GeolibInputCoordinates,
    raw: true
): string | number | undefined;
function getLongitude(point: any, raw?: boolean): any {
    const lonKey = getCoordinateKey(point, longitudeKeys);

    if (typeof lonKey === 'undefined' || lonKey === null) {
        return;
    }

    const value: GeolibLongitudeInputValue = point[
        lonKey as keyof LongitudeKeys
    ] as any;

    return raw === true ? value : toDecimal(value);
}

export default getLongitude;
