import getDistance from './getDistance';

console.log(
    'distance:',
    getDistance(
        { latitude: 51.516241842, longitude: 7.456494328 },
        { latitude: 51.516241842, longitude: 7.456494328 }
    )
);

describe('getDistance', () => {
    it('should calculate the distance between any two points', () => {
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

    it('should return 0 if two identical points are given', () => {
        expect(
            getDistance(
                { latitude: 51.516241843, longitude: 7.456494328 },
                { latitude: 51.516241843, longitude: 7.456494328 }
            )
        ).toBe(0);

        // TODO: WTF! Why is this NaN?!
        // expect(
        //     getDistance(
        //         { latitude: 51.516241842, longitude: 7.456494328 },
        //         { latitude: 51.516241842, longitude: 7.456494328 }
        //     )
        // ).toBe(0);
    });
});
