import {
    GeolibInputCoordinates,
    GeolibLatitudeInputValue,
    LatitudeKeys,
} from './types';
import { latitudeKeys } from './constants';
import getCoordinateKey from './getCoordinateKey';
import toDecimal from './toDecimal';

function getLatitude(point: GeolibInputCoordinates): number;
function getLatitude(
    point: GeolibInputCoordinates,
    raw: true
): string | number | undefined;
function getLatitude(point: any, raw?: boolean): any {
    const latKey = getCoordinateKey(point, latitudeKeys);

    if (typeof latKey === 'undefined' || latKey === null) {
        return;
    }

    const value: GeolibLatitudeInputValue = point[
        latKey as keyof LatitudeKeys
    ] as any;

    return raw === true ? value : toDecimal(value);
}

export default getLatitude;
