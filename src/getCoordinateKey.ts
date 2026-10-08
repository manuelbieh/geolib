import { GeolibInputCoordinates } from './types';

const getCoordinateKey = <Keys>(
    point: GeolibInputCoordinates,
    keysToLookup: Keys[]
) => {
    if (point === undefined || point === null) {
        throw new Error(`'${point}' is no valid coordinate.`);
    }

    return keysToLookup.find((key) =>
        Object.prototype.hasOwnProperty.call(point, key as PropertyKey)
    );
};

export default getCoordinateKey;
