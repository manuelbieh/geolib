import getLatitude from './getLatitude';
import getLongitude from './getLongitude';

// Gets the max and min, latitude and longitude
const getBounds = (points: any[]) => {
    if (Array.isArray(points) === false || points.length === 0) {
        throw new Error('No points were given.');
    }

    return points.reduce(
        (stats, point) => {
            const latitude = getLatitude(point);
            const longitude = getLongitude(point);
            return {
                maxLat: Math.max(latitude, stats.maxLat),
                minLat: Math.min(latitude, stats.minLat),
                maxLng: Math.max(longitude, stats.maxLng),
                minLng: Math.min(longitude, stats.minLng),
            };
        },
        {
            maxLat: -Infinity,
            minLat: Infinity,
            maxLng: -Infinity,
            minLng: Infinity,
        }
    );
};

export default getBounds;
