// Rounds a distance to the nearest multiple of `accuracy`. An accuracy
// of 0 returns the distance as it is.
const roundToAccuracy = (value: number, accuracy: number) => {
    if (accuracy === 0) {
        return value;
    }

    const step = isNaN(accuracy) ? 1 : accuracy;
    return Math.round(value / step) * step;
};

export default roundToAccuracy;
