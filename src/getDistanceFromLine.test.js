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
});
