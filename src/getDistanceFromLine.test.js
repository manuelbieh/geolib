import getDistanceFromLine from './getDistanceFromLine';

describe('getDistanceFromLine', () => {
    it('should get the shortest distance from a point to a line of two points', () => {
        expect(
            getDistanceFromLine(
                { latitude: 51.516, longitude: 7.456 },
                { latitude: 51.512, longitude: 7.456 },
                { latitude: 51.516, longitude: 7.459 }
            )
        ).toEqual(188.5131192933101);
    });

    it('should not break if line start and line end are too close', () => {
        const point = {
            longitude: -75.63287336843746,
            latitude: 6.278381350919607,
        };

        const lineStart = {
            longitude: -75.6220658304469,
            latitude: 6.285304104233529,
        };

        const lineEnd = {
            longitude: -75.62216373107594,
            latitude: 6.285232119894652,
        };

        expect(getDistanceFromLine(point, lineStart, lineEnd)).toEqual(1409);
    });
});
