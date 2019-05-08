import getGreatCircleBearing from './getGreatCircleBearing';

describe('getGreatCircleBearing', () => {
    it('should return a bearing between two points', () => {
        expect(
            getGreatCircleBearing(
                { latitude: 39.778889, longitude: -104.9825 },
                { latitude: 43.778889, longitude: -102.9825 }
            )
        ).toEqual(19.787524850709417);
        expect(
            getGreatCircleBearing(
                { latitude: 51.5104, longitude: 7.3256 },
                { latitude: 43.778889, longitude: 7.491 }
            )
        ).toEqual(179.11237166124715);
    });
});
