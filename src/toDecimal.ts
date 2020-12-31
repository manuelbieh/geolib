import isDecimal from './isDecimal';
import isSexagesimal from './isSexagesimal';
import sexagesimalToDecimal from './sexagesimalToDecimal';
import isValidCoordinate from './isValidCoordinate';
import getCoordinateKeys from './getCoordinateKeys';
import {
    GeolibGeoJSONPoint,
    GeolibInputCoordinates,
    UserInputCoordinates,
} from './types';

function toDecimal(value: number | string): number;
function toDecimal(value: UserInputCoordinates): UserInputCoordinates;
function toDecimal(value: GeolibGeoJSONPoint): GeolibGeoJSONPoint;
function toDecimal(value: GeolibInputCoordinates): GeolibInputCoordinates;
function toDecimal(value: any): any {
    if (isDecimal(value)) {
        return Number(value);
    }

    if (isSexagesimal(value)) {
        return sexagesimalToDecimal(value);
    }

    // value is a valid coordinate with latitude and longitude.
    // Either object literal with latitude and longitude, or GeoJSON array
    if (isValidCoordinate(value)) {
        // value seems to be a GeoJSON array
        if (Array.isArray(value)) {
            return value.map((v, index) =>
                [0, 1].includes(index) ? toDecimal(v!) : v
            );
        }

        const keys = getCoordinateKeys(value);
        // value is an object with latitude and longitude property
        return {
            ...value,
            ...(keys.latitude && {
                [keys.latitude]: toDecimal((value as any)[keys.latitude]),
            }),
            ...(keys.longitude && {
                [keys.longitude]: toDecimal((value as any)[keys.longitude]),
            }),
        };
    }

    // if it is an array, convert every geojson, latlng object
    // and sexagesimal values to decimal
    if (Array.isArray(value)) {
        return value.map((point) =>
            isValidCoordinate(point) ? toDecimal(point) : point
        );
    }

    // Unrecognized format. Return the value itself.
    return value;
}

export default toDecimal;
