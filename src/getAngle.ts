import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import { GeolibInputCoordinates } from './types';

// Converts from degrees to radians.
function toRadians(degrees) {
  return degrees * Math.PI / 180;
};
// Converts from radians to degrees.
function toDegrees(radians) {
  return radians * 180 / Math.PI;
};

// Calculates the angle based on the line of two points.
const getAngle = (
    from: GeolibInputCoordinates,
    to: GeolibInputCoordinates,
    accuracy: number = 1
) => {

    const fromLat = toRadians(getLatitude(from));
    const fromLon = toRadians(getLongitude(from));
    const toLat   = toRadians(getLatitude(to));
    const toLon   = toRadians(getLongitude(to));

    let y = Math.sin(toLon - fromLon) * Math.cos(toLat);
    let x = Math.cos(fromLat) * Math.sin(toLat) -
          Math.sin(fromLat) * Math.cos(toLat) * Math.cos(toLon - fromLon);
    let bearing = Math.atan2(y, x);
    bearing = toDegrees(bearing);
    bearing = (bearing + 360) % 360;
    return parseInt(bearing || 0);

};

export default getAngle;
