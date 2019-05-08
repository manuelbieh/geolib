import getCompassDirection from './getCompassDirection';

describe('getCompassDirection', () => {
    it('should return the exact compass direction between two points', () => {
        expect(
            getCompassDirection(
                { latitude: 52.518611, longitude: 13.408056 },
                { latitude: 51.519475, longitude: 7.46694444 }
            )
        ).toEqual('WSW');

        expect(
            getCompassDirection(
                { latitude: 51.519475, longitude: 7.46694444 },
                { latitude: 52.518611, longitude: 13.408056 }
            )
        ).toEqual('ENE');
    });

    it('should call an optional bearing function', () => {
        const alwaysNorthEast = jest.fn(() => 45);
        const origin = { latitude: 52.518611, longitude: 13.408056 };
        const dest = { latitude: 51.519475, longitude: 7.46694444 };

        expect(getCompassDirection(origin, dest, alwaysNorthEast)).toEqual(
            'NE'
        );
        expect(alwaysNorthEast).toHaveBeenCalledWith(origin, dest);
    });

    it('should throw if the bearing function does not return a number', () => {
        const returnString = () => NaN;

        const origin = { latitude: 52.518611, longitude: 13.408056 };
        const dest = { latitude: 51.519475, longitude: 7.46694444 };

        expect(() => getCompassDirection(origin, dest, returnString)).toThrow();
    });
});
