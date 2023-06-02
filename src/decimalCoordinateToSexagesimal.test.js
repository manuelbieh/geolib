import decimalCoordinateToSexagesimal from './decimalCoordinateToSexagesimal';

describe('decimalCoordinateToSexagesimal', () => {
    it('should return correct value for coordinates >0', () => {
        expect(
            decimalCoordinateToSexagesimal({
                latitude: 121.135,
                longitude: 50,
            })
        ).toEqual({
            latitude: '121° 08\' 06" N',
            longitude: '50° 00\' 00" W',
        });
    });

    it('should return correct value for coordinates <0', () => {
        expect(
            decimalCoordinateToSexagesimal({
                latitude: -121.135,
                longitude: -50,
            })
        ).toEqual({
            latitude: '121° 08\' 06" S',
            longitude: '50° 00\' 00" E',
        });
    });

    it('should return correct value for lat >0 and long <0', () => {
        expect(
            decimalCoordinateToSexagesimal({
                latitude: 121.135,
                longitude: -50,
            })
        ).toEqual({
            latitude: '121° 08\' 06" N',
            longitude: '50° 00\' 00" E',
        });
    });

    it('should return correct value for lat <0 and long >0', () => {
        expect(
            decimalCoordinateToSexagesimal({
                latitude: -121.135,
                longitude: 50,
            })
        ).toEqual({
            latitude: '121° 08\' 06" S',
            longitude: '50° 00\' 00" W',
        });
    });
});
