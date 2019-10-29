// trying to sanitize floating point fuckups here to a certain extent
const imprecise = (number: number) => {
    const factor = Math.pow(10, 12);
    return Math.round(number * factor) / factor;
};

// Converts a decimal coordinate value to sexagesimal format
const decimal2sexagesimal = (decimal: number) => {
    const [pre, post] = decimal.toString().split('.');

    const deg = Math.abs(Number(pre));
    const minFull = imprecise(Number('0.' + (post || 0)) * 60);
    const min = Math.floor(minFull);
    const sec = imprecise((minFull % min || 0) * 60);

    // We're limiting minutes and seconds to a maximum of 6/4 decimal places
    // here purely for aesthetical reasons. That results in an inaccuracy of
    // a few millimeters. If you're working for NASA that's possibly not
    // accurate enough for you. For all others that should be fine.
    // Feel free to create an issue on GitHub if not, please.
    return (
        deg +
        '° ' +
        Number(min.toFixed(6))
            .toString()
            .split('.')
            .map((v, i) => (i === 0 ? v.padStart(2, '0') : v))
            .join('.') +
        "' " +
        Number(sec.toFixed(4))
            .toString()
            .split('.')
            .map((v, i) => (i === 0 ? v.padStart(2, '0') : v))
            .join('.') +
        '"'
    );
};

export default decimal2sexagesimal;
