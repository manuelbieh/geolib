import { sexagesimalPattern } from './constants';

// Converts a sexagesimal coordinate to decimal format
const sexagesimalToDecimal = (sexagesimal: any) => {
    const data = new RegExp(sexagesimalPattern).exec(sexagesimal);

    if (typeof data === 'undefined' || data === null) {
        throw new Error('Given value is not in sexagesimal format');
    }

    const min = Number(data[2]) / 60 || 0;
    const sec = Number(data[4]) / 3600 || 0;

    const decimal = parseFloat(data[1]) + min + sec;

    // Southern and western coordinates must be negative decimals
    return ['S', 'W'].includes(data[7]) ? -decimal : decimal;
};

export default sexagesimalToDecimal;
