import { GeolibInputCoordinates } from './types';

const getCoordinateKey = <Keys>(
    point: GeolibInputCoordinates,
    keysToLookup: Keys[]
) => {
    return keysToLookup.reduce((foundKey: Keys | undefined, key: any):
        | Keys
        | undefined => {
        if (typeof point === 'undefined' || point === null) {
            throw new Error(`'${point}' is no valid coordinate.`);
        }
        if (
            point.hasOwnProperty(key) &&
            typeof key !== 'undefined' &&
            typeof foundKey === 'undefined'
        ) {
            foundKey = key;
            return key;
        }

        return foundKey;
    }, undefined);
};

export default getCoordinateKey;
