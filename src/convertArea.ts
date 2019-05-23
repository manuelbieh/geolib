import { areaConversion } from './constants';

// This is a convenience function to easily convert distances in square meters to
// any other common square measure (km2, sqft, ha, ...)
const convertArea = (squareMeters: number, targetUnit: string = 'm') => {
    const factor = areaConversion[targetUnit];
    if (factor) {
        return squareMeters * factor;
    }
    throw new Error('Invalid unit used for area conversion.');
};

export default convertArea;
