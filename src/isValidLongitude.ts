import isDecimal from './isDecimal';
import isSexagesimal from './isSexagesimal';
import sexagesimalToDecimal from './sexagesimalToDecimal';
import { maxLon, minLon } from './constants';

const isValidLongitude = (value: any): boolean => {
    if (isDecimal(value)) {
        if (parseFloat(value) > maxLon || value < minLon) {
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
