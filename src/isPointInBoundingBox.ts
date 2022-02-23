import { BoundingBox, GeolibInputCoordinates } from './types';
import { getLatitude, getLongitude } from '.';

// minlat = south
// minlon = west
// maxlat = north
// maxlon = east

const isPointInBoundingBox = (
    point: GeolibInputCoordinates,
    boundingBox: BoundingBox
) => {
    const latitude = getLatitude(point);
    const longitude = getLongitude(point);

    let isPointEastOfWestLine = false;
    let isPointWestOfEastLine = false;
    let isPointSouthOfNorthLine = false;
    let isPointNorthOfSouthLine = false;

    // West coordinate is bigger than east coordinate, we're crossing the dateline
    if (boundingBox.maxlon < boundingBox.minlon) {
        if (longitude >= boundingBox.minlon) {
            isPointEastOfWestLine = true;
            isPointWestOfEastLine = true;
        }

        if (longitude <= boundingBox.maxlon) {
            isPointWestOfEastLine = true;
            isPointEastOfWestLine = true;
        }
    } else {
        if (longitude >= boundingBox.minlon) {
            isPointEastOfWestLine = true;
        }
        if (longitude <= boundingBox.maxlon) {
            isPointWestOfEastLine = true;
        }
    }

    if (latitude >= boundingBox.minlat) {
        isPointNorthOfSouthLine = true;
    }

    if (latitude <= boundingBox.maxlat) {
        isPointSouthOfNorthLine = true;
    }

    return (
        isPointEastOfWestLine &&
        isPointWestOfEastLine &&
        isPointNorthOfSouthLine &&
        isPointSouthOfNorthLine
    );
};

export default isPointInBoundingBox;
