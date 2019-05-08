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
            stats.maxLat = Math.max(getLatitude(point), stats.maxLat);
            stats.minLat = Math.min(getLatitude(point), stats.minLat);
            stats.maxLng = Math.max(getLongitude(point), stats.maxLng);
            stats.minLng = Math.min(getLongitude(point), stats.minLng);
            return stats;
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
