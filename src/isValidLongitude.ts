import isDecimal from './isDecimal';
import isSexagesimal from './isSexagesimal';
import sexagesimalToDecimal from './sexagesimalToDecimal';
import { MAXLON, MINLON } from './constants';

const isValidLongitude = (value: any): boolean => {
    if (isDecimal(value)) {
        const numValue = parseFloat(value);
        if (numValue > MAXLON || numValue < MINLON) {
            return false;
        }

        return true;
    }

    if (isSexagesimal(value)) {
        return isValidLongitude(sexagesimalToDecimal(value));
    }

    return false;
};

export default isValidLongitude;
