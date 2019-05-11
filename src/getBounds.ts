import getLatitude from './getLatitude';
import getLongitude from './getLongitude';

// Gets the max and min, latitude and longitude
const getBounds = (points: any[]) => {
    if (Array.isArray(points) === false || points.length === 0) {
        return false;
    }

    // TODO: Re-add support for elevation
    return points.reduce(
        (stats, point) => {
            return {
                maxLat: Math.max(getLatitude(point), stats.maxLat),
                minLat: Math.min(getLatitude(point), stats.minLat),
                maxLng: Math.max(getLongitude(point), stats.maxLng),
                minLng: Math.min(getLongitude(point), stats.minLng),
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
