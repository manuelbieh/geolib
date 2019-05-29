import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import toRad from './toRad';
import toDeg from './toDeg';
import { GeolibInputCoordinates } from './types';

// Calculates the center of a collection of points
const getCenter = (points: GeolibInputCoordinates[]) => {
    if (Array.isArray(points) === false || points.length === 0) {
        return false;
    }

    const numberOfPoints = points.length;

    const sum = points.reduce(
        (acc, point) => {
            const pointLat = toRad(getLatitude(point));
            const pointLon = toRad(getLongitude(point));

            return {
                X: acc.X + Math.cos(pointLat) * Math.cos(pointLon),
                Y: acc.Y + Math.cos(pointLat) * Math.sin(pointLon),
                Z: acc.Z + Math.sin(pointLat),
            };
        },
        { X: 0, Y: 0, Z: 0 }
    );

    const X = sum.X / numberOfPoints;
    const Y = sum.Y / numberOfPoints;
    const Z = sum.Z / numberOfPoints;

    return {
        longitude: toDeg(Math.atan2(Y, X)),
        latitude: toDeg(Math.atan2(Z, Math.sqrt(X * X + Y * Y))),
    };
};

export default getCenter;
