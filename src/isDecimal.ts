// Checks if a value is in decimal format
const isDecimal = (value: any) => {
    // Most values are numbers already. Checking them directly is a lot
    // faster than the string conversion below.
    if (typeof value === 'number') {
        return !isNaN(value);
    }

    if (value === undefined || value === null) {
        return false;
    }

    const checkedValue = value.toString().trim();

    if (isNaN(parseFloat(checkedValue))) {
        return false;
    }

    return parseFloat(checkedValue) === Number(checkedValue);
};

export default isDecimal;
