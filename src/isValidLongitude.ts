import isDecimal from './isDecimal';
import isSexagesimal from './isSexagesimal';
import sexagesimalToDecimal from './sexagesimalToDecimal';
import { MAXLON, MINLON } from './constants';

// TODO: Add tests
const isValidLongitude = (value: any): boolean => {
    if (isDecimal(value)) {
        if (parseFloat(value) > MAXLON || value < MINLON) {
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
