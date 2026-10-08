import isPointInPolygon from './isPointInPolygon';

const polygon = [
    { latitude: 51.513357512, longitude: 7.45574331 },
    { latitude: 51.515400598, longitude: 7.45518541 },
    { latitude: 51.516241842, longitude: 7.456494328 },
    { latitude: 51.516722545, longitude: 7.459863183 },
    { latitude: 51.517443592, longitude: 7.463232037 },
    { latitude: 51.5177507, longitude: 7.464755532 },
    { latitude: 51.517657233, longitude: 7.466622349 },
    { latitude: 51.51722995, longitude: 7.468317505 },
    { latitude: 51.516816015, longitude: 7.47011995 },
    { latitude: 51.516308606, longitude: 7.471793648 },
    { latitude: 51.515974782, longitude: 7.472437378 },
    { latitude: 51.515413951, longitude: 7.472845074 },
    { latitude: 51.514559338, longitude: 7.472909447 },
    { latitude: 51.512195717, longitude: 7.472651955 },
    { latitude: 51.511127373, longitude: 7.47140741 },
    { latitude: 51.51029939, longitude: 7.469948288 },
    { latitude: 51.509831973, longitude: 7.468446251 },
    { latitude: 51.509978876, longitude: 7.462481019 },
    { latitude: 51.510913701, longitude: 7.460678574 },
    { latitude: 51.511594777, longitude: 7.459434029 },
    { latitude: 51.512396029, longitude: 7.457695958 },
    { latitude: 51.513317451, longitude: 7.45574331 },
];

describe('isPointInPolygon', () => {
    it('should return true if a given point is inside of a polygon', () => {
        const pointIsInside = isPointInPolygon(
            { latitude: 51.514252208, longitude: 7.464905736 },
            polygon
        );
        expect(pointIsInside).toBe(true);
    });

    it('should return false if a given point is not inside of a polygon', () => {
        const pointIsNotInside = isPointInPolygon(
            { latitude: 51.510539773, longitude: 7.454691884 },
            polygon
        );
        expect(pointIsNotInside).toBe(false);
    });

    it('should accept GeoJSON points and sexagesimal values', () => {
        const square = [
            [7.4, 51.5],
            [7.6, 51.5],
            [7.6, 51.6],
            [7.4, 51.6],
        ];

        expect(isPointInPolygon([7.5, 51.55], square)).toBe(true);
        expect(isPointInPolygon({ lat: "51° 33' N", lng: 7.5 }, square)).toBe(
            true
        );
        expect(isPointInPolygon([7.7, 51.55], square)).toBe(false);
    });

    it('should not depend on the direction or closing of the polygon', () => {
        const clockwise = [
            { latitude: 10, longitude: 10 },
            { latitude: 10, longitude: 20 },
            { latitude: 0, longitude: 20 },
            { latitude: 0, longitude: 10 },
        ];
        const counterClockwise = [...clockwise].reverse();
        const closed = [...clockwise, clockwise[0]];
        const inside = { latitude: 5, longitude: 15 };
        const outside = { latitude: 5, longitude: 25 };

        for (const polygon of [clockwise, counterClockwise, closed]) {
            expect(isPointInPolygon(inside, polygon)).toBe(true);
            expect(isPointInPolygon(outside, polygon)).toBe(false);
        }
    });

    it('should work with concave polygons', () => {
        // U-shaped polygon, open at the top
        const polygon = [
            { latitude: 0, longitude: 0 },
            { latitude: 0, longitude: 30 },
            { latitude: 30, longitude: 30 },
            { latitude: 30, longitude: 20 },
            { latitude: 10, longitude: 20 },
            { latitude: 10, longitude: 10 },
            { latitude: 30, longitude: 10 },
            { latitude: 30, longitude: 0 },
        ];

        expect(isPointInPolygon({ latitude: 20, longitude: 5 }, polygon)).toBe(
            true
        );
        expect(isPointInPolygon({ latitude: 20, longitude: 25 }, polygon)).toBe(
            true
        );
        expect(isPointInPolygon({ latitude: 20, longitude: 15 }, polygon)).toBe(
            false
        );
    });

    it('should work with polygons that cross the antimeridian', () => {
        // https://github.com/manuelbieh/geolib/issues/38
        const polygon = [
            { latitude: 10, longitude: 175 },
            { latitude: 10, longitude: -175 },
            { latitude: 20, longitude: -175 },
            { latitude: 20, longitude: 175 },
        ];

        for (const vertices of [polygon, [...polygon].reverse()]) {
            expect(
                isPointInPolygon({ latitude: 15, longitude: 177 }, vertices)
            ).toBe(true);
            expect(
                isPointInPolygon({ latitude: 15, longitude: -176 }, vertices)
            ).toBe(true);
            expect(
                isPointInPolygon({ latitude: 15, longitude: 180 }, vertices)
            ).toBe(true);
            expect(
                isPointInPolygon({ latitude: 15, longitude: -170 }, vertices)
            ).toBe(false);
            expect(
                isPointInPolygon({ latitude: 15, longitude: 170 }, vertices)
            ).toBe(false);
            expect(
                isPointInPolygon({ latitude: 15, longitude: 0 }, vertices)
            ).toBe(false);
        }
    });

    it('should keep polygons with edges along the antimeridian intact', () => {
        // Covers the south pole the way it is drawn on a flat map
        const southPole = [
            { latitude: -60, longitude: -180 },
            { latitude: -60, longitude: 180 },
            { latitude: -90, longitude: 180 },
            { latitude: -90, longitude: -180 },
        ];

        expect(
            isPointInPolygon({ latitude: -70, longitude: 0 }, southPole)
        ).toBe(true);
        expect(
            isPointInPolygon({ latitude: -70, longitude: 179 }, southPole)
        ).toBe(true);
        expect(
            isPointInPolygon({ latitude: -50, longitude: 0 }, southPole)
        ).toBe(false);
    });
});
