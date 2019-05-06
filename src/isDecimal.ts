/**
 * Checks if a value is in decimal format
 *
 * @param        string      Value to be checked
 * @return       bool        True if in sexagesimal format
 */
const isDecimal = (value) => {
    value = value.toString().replace(/\s*/, '');

    // looks silly but works as expected
    // checks if value is in decimal format
    return !isNaN(parseFloat(value)) && parseFloat(value) == value;
};

export default isDecimal;
