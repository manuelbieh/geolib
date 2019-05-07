import isDecimal from './isDecimal';
import isSexagesimal from './isSexagesimal';
import sexagesimalToDecimal from './sexagesimalToDecimal';
import { maxLat, minLat } from './constants';

const isValidLatitude = (value: any): boolean => {
    if (isDecimal(value)) {
        if (parseFloat(value) > maxLat || value < minLat) {
            return false;
        }

        return true;
    }

    if (isSexagesimal(value)) {
        return isValidLatitude(sexagesimalToDecimal(value));
    }

    return false;
};

export default isValidLatitude;
