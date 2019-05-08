import getRhumbLineBearing from './getRhumbLineBearing';

describe('getRhumbLineBearing', () => {
    it('should return a bearing between two points', () => {
        expect(
            getRhumbLineBearing(
                { latitude: 39.778889, longitude: -104.9825 },
                { latitude: 43.778889, longitude: -102.9825 }
            )
        ).toEqual(20.438617005368314);
    });
});
