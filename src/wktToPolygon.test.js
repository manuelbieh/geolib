import wktToPolygon from './wktToPolygon';

describe('wktToPolygon', () => {
    it('converts a WKT to Polygon', () => {
        const wkt = 'POLYGON ((30 10.54321, 40 40, 20 40, 10 20, 30 10))';
        expect(wktToPolygon(wkt)).toEqual([
            { latitude: 10.54321, longitude: 30 },
            { latitude: 40, longitude: 40 },
            { latitude: 40, longitude: 20 },
            { latitude: 20, longitude: 10 },
            { latitude: 10, longitude: 30 },
        ]);
    });

    it('keeps the sign of negative coordinates', () => {
        expect(
            wktToPolygon(
                'POLYGON((-83.094492 39.965258, -83.093337 -39.963332, -83.094492 39.965258))'
            )
        ).toEqual([
            { latitude: 39.965258, longitude: -83.094492 },
            { latitude: -39.963332, longitude: -83.093337 },
            { latitude: 39.965258, longitude: -83.094492 },
        ]);
    });

    it('keeps the sign of the first coordinate if the ring has only one parenthesis', () => {
        // https://github.com/manuelbieh/geolib/issues/310
        expect(
            wktToPolygon(
                'POLYGON(-83.094492 39.965258, -83.093337 39.963332, -83.094492 39.965258)'
            )[0]
        ).toEqual({ latitude: 39.965258, longitude: -83.094492 });
    });

    it('accepts any whitespace between coordinates', () => {
        expect(wktToPolygon('POLYGON((30 10,40 40,20 40,30 10))')).toEqual([
            { latitude: 10, longitude: 30 },
            { latitude: 40, longitude: 40 },
            { latitude: 40, longitude: 20 },
            { latitude: 10, longitude: 30 },
        ]);

        expect(
            wktToPolygon('POLYGON ( ( 30  10 ,\n\t40 40 , 20 40, 30 10 ) )')
        ).toEqual([
            { latitude: 10, longitude: 30 },
            { latitude: 40, longitude: 40 },
            { latitude: 40, longitude: 20 },
            { latitude: 10, longitude: 30 },
        ]);
    });

    it('returns the exterior ring of a polygon with holes', () => {
        expect(
            wktToPolygon(
                'POLYGON ((35 10, 45 45, 15 40, 35 10), (20 30, 35 35, 30 20, 20 30))'
            )
        ).toEqual([
            { latitude: 10, longitude: 35 },
            { latitude: 45, longitude: 45 },
            { latitude: 40, longitude: 15 },
            { latitude: 10, longitude: 35 },
        ]);
    });

    it('ignores the z and m values of 3D and measured polygons', () => {
        expect(
            wktToPolygon('POLYGON Z ((30 10 5, 40 40 6, 20 40 7, 30 10 5))')
        ).toEqual([
            { latitude: 10, longitude: 30 },
            { latitude: 40, longitude: 40 },
            { latitude: 40, longitude: 20 },
            { latitude: 10, longitude: 30 },
        ]);
    });

    it('is case insensitive', () => {
        expect(wktToPolygon('polygon ((30 10, 40 40, 30 10))')).toEqual([
            { latitude: 10, longitude: 30 },
            { latitude: 40, longitude: 40 },
            { latitude: 10, longitude: 30 },
        ]);
    });

    it('throw error when is not a POLYGON', () => {
        const wkt = 'MULTIPOLYGON (((3 2, 45 4, 3 2)), ((15 5, 4 1, 15 5)))';
        expect(() => wktToPolygon(wkt)).toThrow('Invalid wkt.');
    });
});
