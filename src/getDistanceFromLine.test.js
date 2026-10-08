import getDistanceFromLine from './getDistanceFromLine';

describe('getDistanceFromLine', () => {
    it('should get the shortest distance from a point to a line of two points', () => {
        expect(
            getDistanceFromLine(
                { latitude: 51.516, longitude: 7.456 },
                { latitude: 51.512, longitude: 7.456 },
                { latitude: 51.516, longitude: 7.459 }
            )
        ).toEqual(188);
    });

    it('should round the result to the given accuracy', () => {
        const point = { latitude: 51.516, longitude: 7.456 };
        const lineStart = { latitude: 51.512, longitude: 7.456 };
        const lineEnd = { latitude: 51.516, longitude: 7.459 };

        expect(getDistanceFromLine(point, lineStart, lineEnd, 0.1)).toEqual(
            188.3
        );
        expect(getDistanceFromLine(point, lineStart, lineEnd, 0)).toBeCloseTo(
            188.31845,
            4
        );
    });

    it('should be precise for very short lines', () => {
        const meterInDegrees = 1 / ((6378137 * Math.PI) / 180);

        // 30 cm next to the middle of a 2 m line along the equator
        expect(
            getDistanceFromLine(
                { latitude: 0.3 * meterInDegrees, longitude: meterInDegrees },
                { latitude: 0, longitude: 0 },
                { latitude: 0, longitude: 2 * meterInDegrees },
                0.01
            )
        ).toBeCloseTo(0.3, 6);
    });

    it('should not break if line start and line end are too close', () => {
        const point = {
            longitude: -75.63287336843746,
            latitude: 6.278381350919607,
        };

        const lineStart = {
            longitude: -75.6220658304469,
            latitude: 6.285304104233529,
        };

        const lineEnd = {
            longitude: -75.62216373107594,
            latitude: 6.285232119894652,
        };

        expect(getDistanceFromLine(point, lineStart, lineEnd)).toEqual(1409);
    });

    it('https://github.com/manuelbieh/geolib/issues/129', () => {
        expect(
            getDistanceFromLine(
                {
                    latitude: 53.0281161107639,
                    longitude: 5.64420448614743,
                },
                {
                    latitude: 53.028118,
                    longitude: 5.644203,
                },
                {
                    latitude: 53.029021,
                    longitude: 5.646562,
                },
                0.1
            )
        ).not.toBeNaN();

        expect(
            getDistanceFromLine(
                {
                    latitude: 53.0515182362456,
                    longitude: 5.67842625473533,
                },
                {
                    latitude: 53.051521,
                    longitude: 5.678421,
                },
                {
                    latitude: 53.051652,
                    longitude: 5.67852,
                },
                0.1
            )
        ).not.toBeNaN();

        expect(
            getDistanceFromLine(
                {
                    latitude: 53.0933224175307,
                    longitude: 5.61011575344944,
                },
                {
                    latitude: 53.093321,
                    longitude: 5.610115,
                },
                {
                    latitude: 53.093236,
                    longitude: 5.610037,
                },
                0.1
            )
        ).not.toBeNaN();

        expect(
            getDistanceFromLine(
                {
                    latitude: 53.0867058030163,
                    longitude: 5.59876618900706,
                },
                {
                    latitude: 53.086705,
                    longitude: 5.598759,
                },
                {
                    latitude: 53.085538,
                    longitude: 5.597901,
                },
                0.1
            )
        ).not.toBeNaN();

        expect(
            getDistanceFromLine(
                {
                    latitude: 53.0657207151762,
                    longitude: 5.60056383087291,
                },
                {
                    latitude: 53.065721,
                    longitude: 5.600568,
                },
                {
                    latitude: 53.062609,
                    longitude: 5.600793,
                },
                0.1
            )
        ).not.toBeNaN();
    });

    it('should not return NaN if point is on line', () => {
        expect(
            getDistanceFromLine(
                {
                    latitude: 53,
                    longitude: 5,
                },
                {
                    latitude: 53,
                    longitude: 5,
                },
                {
                    latitude: 54,
                    longitude: 6,
                },
                1
            )
        ).not.toBeNaN();
    });

    it('should not return NaN if lineStart and lineEnd are (effectively) the same', () => {
        expect(
            getDistanceFromLine(
                {
                    latitude: 51.5588,
                    longitude: 7.06044,
                },
                {
                    latitude: 51.42829895019531,
                    longitude: 7.05250883102417,
                },
                {
                    latitude: 51.42829895019531,
                    longitude: 7.0525078773498535,
                },
                1
            )
        ).not.toBeNaN();
    });
});
