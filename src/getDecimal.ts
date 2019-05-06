import isDecimal from './isDecimal';
import isSexagesimal from './isSexagesimal';

const getDecimal = (value) => {
    if (Array.isArray(value)) {
        value = value.map((val) => {
            if (isDecimal(val)) {
                return val;
            } else if (typeof val === 'object') {
                if (geolib.validate(val)) {
                    return geolib.coords(val);
                }
                for (const prop in val) {
                    val[prop] = geolib.useDecimal(val[prop]);
                }

                return val;
            } else if (geolib.isSexagesimal(val)) {
                return geolib.sexagesimal2decimal(val);
            }
            return val;
        });

        return value;
    } else if (typeof value === 'object' && this.validate(value)) {
        return this.coords(value);
    } else if (typeof value === 'object') {
        for (const prop in value) {
            value[prop] = this.useDecimal(value[prop]);
        }

        return value;
    }

    if (isDecimal(value)) {
        return parseFloat(value);
    } else if (isSexagesimal(value) === true) {
        return parseFloat(this.sexagesimal2decimal(value));
    }

    throw new Error('Unknown format.');
};

export default getDecimal;
