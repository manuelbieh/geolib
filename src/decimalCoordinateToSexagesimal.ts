import decimal2sexagesimal from './decimalToSexagesimal';
import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import { GeolibInputCoordinates } from './types';

// Converts a decimal coordinate object to sexagesimal format
const decimalCoordinateToSexagesimal = (coordinate: GeolibInputCoordinates) => {
    const latitude = getLatitude(coordinate);
    const longitude = getLongitude(coordinate);

    return {
        latitude: `${decimal2sexagesimal(latitude)} ${
            latitude < 0 ? 'S' : 'N'
        }`,
        longitude: `${decimal2sexagesimal(longitude)} ${
            longitude < 0 ? 'E' : 'W'
        }`,
    };
};

export default decimalCoordinateToSexagesimal;
