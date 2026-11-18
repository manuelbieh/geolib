// trying to sanitize floating point fuckups here to a certain extent
const imprecise = (number: number, decimals: number = 4) => {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
};

// Converts a decimal coordinate value to sexagesimal format
const decimalToSexagesimal = (decimal: number) => {
    // Work in seconds and round once, so seconds that round up to 60 carry
    // into the minutes (and 60 minutes into the degrees). This also avoids
    // reading digits from toString(), which uses exponent notation for
    // values below 1e-6.
    const totalSeconds = imprecise(Math.abs(decimal) * 3600);

    const deg = Math.floor(totalSeconds / 3600);
    const min = Math.floor(imprecise(totalSeconds - deg * 3600) / 60);
    const sec = imprecise(totalSeconds - deg * 3600 - min * 60).toString();

    const [secPreDec, secDec = '0'] = sec.split('.');

    return (
        deg +
        '° ' +
        min.toString().padStart(2, '0') +
        "' " +
        secPreDec.padStart(2, '0') +
        '.' +
        secDec.padEnd(1, '0') +
        '"'
    );
};

export default decimalToSexagesimal;
