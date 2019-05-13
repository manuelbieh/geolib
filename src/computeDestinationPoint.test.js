import computeDestinationPoint from './computeDestinationPoint';

describe('computeDestinationPoint', () => {
    it('should get the destination point to a given point, distance and bearing', () => {
        expect(
            computeDestinationPoint(
                { latitude: 52.518611, longitude: 13.408056 },
                15000,
                180
            )
        ).toEqual({
            latitude: 52.38386370738208,
            longitude: 13.408056,
        });

        expect(
            computeDestinationPoint(
                { latitude: 52.518611, longitude: 13.408056 },
                15000,
                135
            )
        ).toEqual({
            latitude: 52.42322722672353,
            longitude: 13.564299057246112,
        });
    });

    it('should not exceed maxLon or fall below minLon', () => {
        expect(
            computeDestinationPoint(
                { latitude: 18.5075232, longitude: 73.8047121 },
                50000000,
                0
            )
        ).toEqual({
            latitude: 72.3348347402393,
            longitude: -106.19528790000001,
        });
    });

    it('should leave longitude untouched if bearing is 0 or 180', () => {
        expect(
            computeDestinationPoint(
                { latitude: 18.5075232, longitude: 73.8047121 },
                500,
                0
            )
        ).toEqual({
            latitude: 18.5120147764206,
            longitude: 73.8047121,
        });

        expect(
            computeDestinationPoint(
                { latitude: 18.5075232, longitude: 73.8047121 },
                500,
                180
            )
        ).toEqual({
            latitude: 18.50303162357941,
            longitude: 73.8047121,
        });
    });
});
