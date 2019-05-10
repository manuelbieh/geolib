// trying to sanitize floating point fuckups here to a certain extent
const imprecise = (number: number) => {
    const factor = Math.pow(10, 12);
    return Math.round(number * factor) / factor;
};

// Converts a decimal coordinate value to sexagesimal format
const decimal2sexagesimal = (decimal: number) => {
    const [pre, post] = decimal.toString().split('.');

    const deg = Math.abs(Number(pre));
    const minFull = imprecise(Number('.' + (post || 0)) * 60);
    const min = Math.floor(minFull);
    const minRest = imprecise(minFull - min);
    const sec = imprecise(minRest * 60);

    // We're limiting minutes and seconds to a maximum of 6/4 decimal places
    // here purely for aesthetical reasons. That results in an inaccuracy of
    // a few millimeters. If you're working for NASA that's possibly not
    // accurate enough for you. For all others that should be fine.
    // Feel free to create an issue on GitHub if not, please.
    return (
        deg +
        '° ' +
        Number(min.toFixed(6)) +
        "' " +
        Number(sec.toFixed(4)) +
        '"'
    );
};

export default decimal2sexagesimal;
