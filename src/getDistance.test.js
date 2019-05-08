import getDistance from './getDistance';

describe('getDistance', () => {
    it('calculates the distance between any two points', () => {
        expect(
            getDistance(
                { latitude: 52.518611, longitude: 13.408056 },
                { latitude: 51.519475, longitude: 7.46694444 }
            )
        ).toEqual(421786);

        expect(
            getDistance(
                { latitude: 52.518611, longitude: 13.408056 },
                { latitude: 51.519475, longitude: 7.46694444 },
                100
            )
        ).toEqual(421800);

        expect(
            getDistance(
                { latitude: 37.774514, longitude: -122.418079 },
                { latitude: 51.519475, longitude: 7.46694444 }
            )
        ).toEqual(8967172);

        expect(
            getDistance([-122.418079, 37.774514], [7.46694444, 51.519475])
        ).toEqual(8967172);
    });
});
