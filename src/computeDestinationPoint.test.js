import computeDestinationPoint from './computeDestinationPoint';

const expectCloseCoords = (result, expected) => {
    expect(result.latitude).toBeCloseTo(expected.latitude, 10);
    expect(result.longitude).toBeCloseTo(expected.longitude, 10);
};

describe('computeDestinationPoint', () => {
    it('should get the destination point to a given point, distance and bearing', () => {
        expectCloseCoords(
            computeDestinationPoint(
                { latitude: 52.518611, longitude: 13.408056 },
                15000,
                180
            ),
            {
                latitude: 52.383712759112186,
                longitude: 13.408056,
            }
        );

        expectCloseCoords(
            computeDestinationPoint(
                { latitude: 52.518611, longitude: 13.408056 },
                15000,
                135
            ),
            {
                latitude: 52.42312025947117,
                longitude: 13.56447370636139,
            }
        );
    });

    it('should not exceed maxLon or fall below minLon', () => {
        expectCloseCoords(
            computeDestinationPoint(
                { latitude: 18.5075232, longitude: 73.8047121 },
                50000000,
                0
            ),
            {
                latitude: 71.83167384063478,
                longitude: -106.19528790000001,
            }
        );
    });

    it('should leave longitude untouched if bearing is 0 or 180', () => {
        expectCloseCoords(
            computeDestinationPoint(
                { latitude: 18.5075232, longitude: 73.8047121 },
                500,
                0
            ),
            {
                latitude: 18.512019808029596,
                longitude: 73.8047121,
            }
        );

        expectCloseCoords(
            computeDestinationPoint(
                { latitude: 18.5075232, longitude: 73.8047121 },
                500,
                180
            ),
            {
                latitude: 18.50302659197041,
                longitude: 73.8047121,
            }
        );
    });
});
