import getCenter from './getCenter';

const cities = {
    Berlin: {
        latitude: 52.518611,
        longitude: 13.408056,
    },
    Boston: {
        latitude: 42.357778,
        longitude: '71° 3\' 34" W',
    },
    Dortmund: {
        latitude: '51° 31\' 10.11" N',
        longitude: '7° 28\' 01" E',
    },
    London: {
        latitude: "51° 31' N",
        longitude: "0° 7' W",
    },
    Manchester: {
        latitude: "53° 29' N",
        longitude: "2° 14' W",
    },
    NewYorkCity: {
        latitude: 40.715517,
        longitude: -73.9991,
    },
    SanFrancisco: {
        latitude: 37.774514,
        longitude: -122.418079,
    },
    Sydney: [151.210046, -33.869085],
    Moscow: {
        latitude: 55.751667,
        longitude: 37.617778,
    },
};

describe('getCenter', () => {
    it('gets the center of two points', () => {
        expect(getCenter([cities.Berlin, cities.Moscow])).toEqual({
            longitude: 25.0332388360222,
            latitude: 54.74368339960522,
        });
        expect(getCenter([cities.Sydney, cities.SanFrancisco])).toEqual({
            longitude: -166.9272249630353,
            latitude: 2.6764932317022576,
        });
    });

    it('gets the center of multiple points', () => {
        const values = Object.values(cities);
        expect(getCenter(values)).toEqual({
            latitude: 65.41916196002177,
            longitude: -28.01313266917171,
        });
    });
});
