import computeDestinationPoint from './computeDestinationPoint';

describe('computeDestinationPoint', () => {
    it('gets the destination point to a given point, distance and bearing', () => {
        expect(
            computeDestinationPoint(
                { latitude: 52.518611, longitude: 13.408056 },
                15000,
                180
            )
        ).toEqual({
            latitude: 52.38386370738208,
            longitude: 13.408055999999977,
        });

        expect(
            computeDestinationPoint(
                { latitude: 52.518611, longitude: 13.408056 },
                15000,
                135
            )
        ).toEqual({
            latitude: 52.42322722672353,
            longitude: 13.564299057246114,
        });
    });
});
