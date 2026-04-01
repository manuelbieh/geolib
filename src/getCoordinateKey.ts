import { GeolibInputCoordinates } from './types';

const getCoordinateKey = <Keys>(
    point: GeolibInputCoordinates,
    keysToLookup: Keys[]
) => {
    return keysToLookup.reduce((foundKey: Keys | undefined, key: any):
        | Keys
        | undefined => {
        if (point === undefined || point === null) {
            throw new Error(`'${point}' is no valid coordinate.`);
        }
        if (
            Object.prototype.hasOwnProperty.call(point, key) &&
            key !== undefined &&
            foundKey === undefined
        ) {
            foundKey = key;
            return key;
        }

        return foundKey;
    }, undefined);
};

export default getCoordinateKey;
