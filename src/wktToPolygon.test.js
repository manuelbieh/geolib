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

    it('throw error when is not a POLYGON', () => {
        const wkt = 'MULTIPOLYGON (((3 2, 45 4, 3 2)), ((15 5, 4 1, 15 5)))';
        expect(() => wktToPolygon(wkt)).toThrowError('Invalid wkt.');
    });
});
