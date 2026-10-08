import computeDestinationPoint from './computeDestinationPoint';
import getDistance from './getDistance';

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
                latitude: 52.38386370738208,
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
                latitude: 52.42322722672353,
                longitude: 13.564299057246112,
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
                latitude: 72.3348347402393,
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
                latitude: 18.5120147764206,
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
                latitude: 18.50303162357941,
                longitude: 73.8047121,
            }
        );
    });

    it('should use the same earth radius as getDistance by default', () => {
        // https://github.com/manuelbieh/geolib/issues/290
        const start = { latitude: 52.518611, longitude: 13.408056 };
        const destination = computeDestinationPoint(start, 10000, 90);

        expect(getDistance(start, destination, 0)).toBeCloseTo(10000, 6);
    });

    it('should use a custom radius', () => {
        expectCloseCoords(
            computeDestinationPoint(
                { latitude: 52.518611, longitude: 13.408056 },
                15000,
                135,
                6371000
            ),
            {
                latitude: 52.42312025947117,
                longitude: 13.56447370636139,
            }
        );
    });
});
