const lonKeys = ['lng', 'lon', 'longitude'];
const latKeys = ['lat', 'latitude'];
const typesRegex = /number|string/;

const isLongValid = (arg) =>
    !!lonKeys.find((key) => (typeof arg[key]).match(typesRegex));

const isLatValid = (arg) =>
    !!latKeys.find((key) => (typeof arg[key]).match(typesRegex));

const reportInvalid = (arg, fromOrTo, latOrLong) =>
    console.error(
        `[geolib] -> Get distance -> ${latOrLong} invalid for object "${fromOrTo}". expected property lng, lon or longitude to be present and have type of string or number, but received:`,
        arg
    );

const validateLong = (arg, fromOrTo) => {
    if (!isLongValid(arg)) {
        reportInvalid(arg, fromOrTo, 'longitude');
    }
};

const validateLat = (arg, fromOrTo) => {
    if (!isLatValid(arg)) {
        reportInvalid(arg, fromOrTo, 'latitude');
    }
};

const validateCoords = ({ from, to }) => {
    validateLat(from, 'from');
    validateLong(from, 'from');
    validateLat(to, 'to');
    validateLong(to, 'to');
};

export default validateCoords;
