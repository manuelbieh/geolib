import sexagesimalToDecimal from './sexagesimalToDecimal';

describe('sexagesimalToDecimal', () => {
    test('returns a decimal for a sexagesimal value', () => {
        expect(sexagesimalToDecimal('51° 31\' 10.11" N')).toEqual(51.519475);

        expect(sexagesimalToDecimal('7° 28\' 01" E')).toEqual(
            7.466944444444445
        );

        expect(sexagesimalToDecimal('19°    22\'   32"      S')).toEqual(
            -19.375555555555557
        );

        expect(sexagesimalToDecimal('71° 3\'     34" W')).toEqual(
            -71.05944444444444
        );

        expect(sexagesimalToDecimal("71°3'W")).toEqual(-71.05);

        expect(() => sexagesimalToDecimal('51.519470')).toThrow();

        expect(() => sexagesimalToDecimal('-122.418079')).toThrow();

        expect(sexagesimalToDecimal('51° 31.52\' 10.11" N')).toEqual(
            51.52814166666667
        );

        expect(sexagesimalToDecimal('121°26′31″W')).toEqual(
            -121.44194444444445
        );

        expect(sexagesimalToDecimal('51°15′13"N')).toEqual(51.25361111111111);
    });
});
