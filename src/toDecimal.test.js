import toDecimal from './toDecimal';

describe('toDecimal', () => {
    it('converts a sexagesimal value into decimal representation', () => {
        expect(toDecimal('51° 31\' 10.11" N')).toEqual(51.519475);
    });

    it('returns a decimal value as number if it is already in decimal format', () => {
        expect(toDecimal(51.519475)).toEqual(51.519475);
        expect(toDecimal('51.519475')).toEqual(51.519475);
    });

    it('converts a valid coordinate of any type into decimal representation', () => {
        expect(toDecimal({ lat: 1, lng: 1 })).toEqual({ lat: 1, lng: 1 });
        expect(toDecimal({ lat: '51° 31\' 10.11" N', lng: 1 })).toEqual({
            lat: 51.519475,
            lng: 1,
        });
        expect(
            toDecimal({
                latitude: '51° 31\' 10.11" N',
                longitude: '51° 31\' 10.11" N',
            })
        ).toEqual({
            latitude: 51.519475,
            longitude: 51.519475,
        });
        expect(toDecimal([1, 2])).toEqual([1, 2]);
        expect(toDecimal(["71° 0'", 2])).toEqual([71, 2]);
    });

    it('converts an array of arbitrary coordinates to an array of decimal coordinates', () => {
        expect(toDecimal([{ lat: "71° 0'", lng: 1 }])).toEqual([
            {
                lat: 71,
                lng: 1,
            },
        ]);
        expect(
            toDecimal([
                { latitude: "71° 0'", longitude: 1 },
                ["71° 0'", "71° 0'"],
            ])
        ).toEqual([
            {
                latitude: 71,
                longitude: 1,
            },
            [71, 71],
        ]);
    });
});
