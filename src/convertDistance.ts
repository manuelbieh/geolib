import { distanceConversion } from './constants';

// This is a convenience function to easily convert distances in meters to
// any other common distance unit (cm, m, km, mi, ft, ...)
const convertDistance = (meters: number, targetUnit: string = 'm') => {
    const factor = distanceConversion[targetUnit];
    if (factor) {
        return meters * factor;
    }
    throw new Error('Invalid unit used for distance conversion.');
};

export default convertDistance;
