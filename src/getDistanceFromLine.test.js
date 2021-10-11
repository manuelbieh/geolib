import getDistanceFromLine from './getDistanceFromLine';

describe('getDistanceFromLine', () => {
    it('should get the shortest distance from a point to a line of two points', () => {
        expect(
            getDistanceFromLine(
                { latitude: 51.516, longitude: 7.456 },
                { latitude: 51.512, longitude: 7.456 },
                { latitude: 51.516, longitude: 7.459 }
            )
        ).toEqual(188.5131192933101);
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

        // TODO: If the point is directly on the line(?) it returns NaN
        // Verify and fix
        // https://github.com/manuelbieh/geolib/issues/129
        // expect(
        //     getDistanceFromLine(
        //         {
        //             latitude: 53,
        //             longitude: 5,
        //         },
        //         {
        //             latitude: 53,
        //             longitude: 5,
        //         },
        //         {
        //             latitude: 54,
        //             longitude: 6,
        //         },
        //         1
        //     )
        // ).not.toBeNaN();
    });
});
