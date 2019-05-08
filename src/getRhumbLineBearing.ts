import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import toRad from './toRad';
import toDeg from './toDeg';
import { GeolibInputCoordinates } from './types';

/**
 * Gets rhumb line bearing of two points. Find out about the difference between rhumb line and
 * great circle bearing on Wikipedia. It's quite complicated. Rhumb line should be fine in most cases:
 *
 * http://en.wikipedia.org/wiki/Rhumb_line#General_and_mathematical_description
 *
 * Function heavily based on Doug Vanderweide's great PHP version (licensed under GPL 3.0)
 * http://www.dougv.com/2009/07/13/calculating-the-bearing-and-compass-rose-direction-between-two-latitude-longitude-coordinates-in-php/
 */
const getRhumbLineBearing = (
    origin: GeolibInputCoordinates,
    dest: GeolibInputCoordinates
) => {
    // difference of longitude coords
    let diffLon = toRad(getLongitude(dest)) - toRad(getLongitude(origin));

    // difference latitude coords phi
    const diffPhi = Math.log(
        Math.tan(toRad(getLatitude(dest)) / 2 + Math.PI / 4) /
            Math.tan(toRad(getLatitude(origin)) / 2 + Math.PI / 4)
    );

    // recalculate diffLon if it is greater than pi
    if (Math.abs(diffLon) > Math.PI) {
        if (diffLon > 0) {
            diffLon = (Math.PI * 2 - diffLon) * -1;
        } else {
            diffLon = Math.PI * 2 + diffLon;
        }
    }

    //return the angle, normalized
    return (toDeg(Math.atan2(diffLon, diffPhi)) + 360) % 360;
};

export default getRhumbLineBearing;
