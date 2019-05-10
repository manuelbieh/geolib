import getSpeed from './getSpeed';

describe('getSpeed', () => {
    it('gets the average speed between two given points in meters per second', () => {
        expect(
            getSpeed(
                { lat: 51.567294, lng: 7.38896, time: 1360231200880 },
                { lat: 52.54944, lng: 13.468509, time: 1360245600880 }
            )
        ).toEqual(29.86777777777778);

        console.log(
            getSpeed(
                { lat: 51.567294, lng: 7.38896, time: 1360231200880 },
                { lat: 52.54944, lng: 13.468509, time: 1360245600880 }
            )
        );
        // equal(speedInKMH, 107.7308, '430.923 km in 4 hours should equal 107.7308 kmh');
        // equal(speedInMPH, 66.9408, '430.923 km in 4 hours should equal 66.9408 mph');
    });

    it('uses an alternative getDistance function if one is passed', () => {
        const from = { lat: 51.567294, lng: 7.38896, time: 1360231200880 };
        const to = { lat: 52.54944, lng: 13.468509, time: 1360245600880 };
        const getDistance = jest.fn(() => {
            return 100000;
        });

        expect(getSpeed(from, to, getDistance)).toEqual(6.944444444444444);
        expect(getDistance).toHaveBeenCalledWith(from, to);
    });
});
