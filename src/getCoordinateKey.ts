import { GeolibInputCoordinates } from './types';

const getCoordinateKey = <Keys>(
    point: GeolibInputCoordinates,
    keysToLookup: Keys[]
) => {
    if (point === undefined || point === null) {
        throw new Error(`'${point}' is no valid coordinate.`);
    }

    return keysToLookup.reduce(
        (foundKey: Keys | undefined, key: any): Keys | undefined => {
            if (
                Object.prototype.hasOwnProperty.call(point, key) &&
                key !== undefined &&
                foundKey === undefined
            ) {
                foundKey = key;
                return key;
            }

            return foundKey;
        },
        undefined
    );
};

export default getCoordinateKey;
