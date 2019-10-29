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
            latitude: 52.383712759112186,
            longitude: 13.408056,
        });

        expect(
            computeDestinationPoint(
                { latitude: 52.518611, longitude: 13.408056 },
                15000,
                135
            )
        ).toEqual({
            latitude: 52.42312025947117,
            longitude: 13.56447370636139,
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
            latitude: 71.83167384063478,
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
            latitude: 18.512019808029596,
            longitude: 73.8047121,
        });

        expect(
            computeDestinationPoint(
                { latitude: 18.5075232, longitude: 73.8047121 },
                500,
                180
            )
        ).toEqual({
            latitude: 18.50302659197041,
            longitude: 73.8047121,
        });
    });
});
