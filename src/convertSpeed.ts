import { distanceConversion, timeConversion } from './constants';

// This is a convenience function to easily convert the result of getSpeed()
// into miles per hour or kilometers per hour.
const convertSpeed = (metersPerSecond: number, targetUnit = 'kmh') => {
    switch (targetUnit) {
        case 'kmh':
            return metersPerSecond * timeConversion.h * distanceConversion.km;
        case 'mph':
            return metersPerSecond * timeConversion.h * distanceConversion.mi;
        default:
            return metersPerSecond;
    }
};

export default convertSpeed;
