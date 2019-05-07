import { GeolibInputCoordinates } from './types';

const getCoordinateKey = <Keys>(
    point: GeolibInputCoordinates,
    keysToLookup: Keys[]
) => {
    return keysToLookup.reduce((acc: Keys | undefined, key: any):
        | Keys
        | undefined => {
        if (point.hasOwnProperty(key) && typeof key !== 'undefined') {
            acc = key;
            return key;
        }

        return acc;
    }, undefined);
};

export default getCoordinateKey;
