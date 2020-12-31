import { GeolibInputCoordinates } from './types';

const getCoordinateKey = <Keys extends string | number | symbol>(
    point: GeolibInputCoordinates,
    keysToLookup: Keys[]
) => {
    if (typeof point === 'undefined' || point === null) {
        throw new Error(`'${point}' is no valid coordinate.`);
    }

    for (const key of keysToLookup) {
        if (
            Object.prototype.hasOwnProperty.call(point, key) &&
            typeof key !== 'undefined'
        ) {
            type a = keyof typeof point;
            return key;
        }
    }

    return undefined;
};

export default getCoordinateKey;
