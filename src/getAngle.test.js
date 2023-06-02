import getAngle from './getAngle';

describe('getRhumbLineBearing is not the same as Angle', () => {
    it('should return a bearing between two points in degrees', () => {
        expect(
            getAngle(
                { latitude: 39.778889, longitude: -104.9825 },
                { latitude: 43.778889, longitude: -102.9825 }
            )
        ).not.toEqual(20.438617005368314); // will return 19
    });
});

describe('getAngle is not the same as Angle', () => {
    it('should return a bearing between two points in degrees', () => {
        expect(
            getAngle(
                { latitude: -2.584148, longitude: -44.243597 },
                { latitude: -2.584136, longitude: -44.243574 }
            )
        ).toEqual(62);
    });
});
