import getSpeed from './getSpeed';
import getDistance from './getDistance';

describe('getSpeed', () => {
    it('gets the average speed between two given points', () => {
        // getSpeed(
        //     { lat: 51.567294, lng: 7.38896, time: 1360231200880 },
        //     { lat: 52.54944, lng: 13.468509, time: 1360245600880 }
        // );
        console.log(
            getDistance(
                { lat: 51.567294, lng: 7.38896, time: 1360231200880 },
                { lat: 52.54944, lng: 13.468509, time: 1360245600880 }
            )
        );
        console.log(
            getSpeed(
                { lat: 51.567294, lng: 7.38896, time: 1360231200880 },
                { lat: 52.54944, lng: 13.468509, time: 1360245600880 }
            )
        );
        // equal(speedInKMH, 107.7308, '430.923 km in 4 hours should equal 107.7308 kmh');
        // equal(speedInMPH, 66.9408, '430.923 km in 4 hours should equal 66.9408 mph');
    });
});
