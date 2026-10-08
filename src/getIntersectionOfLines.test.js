import computeDestinationPoint from './computeDestinationPoint';
import getGreatCircleBearing from './getGreatCircleBearing';
import getIntersectionOfLines from './getIntersectionOfLines';

const expectCloseCoords = (result, expected, precision = 10) => {
    expect(result.latitude).toBeCloseTo(expected.latitude, precision);
    expect(result.longitude).toBeCloseTo(expected.longitude, precision);
};

describe('getIntersectionOfLines', () => {
    it('should return the point where two lines cross', () => {
        expectCloseCoords(
            getIntersectionOfLines(
                { latitude: 0, longitude: -1 },
                { latitude: 0, longitude: 1 },
                { latitude: -1, longitude: 0 },
                { latitude: 1, longitude: 0 }
            ),
            { latitude: 0, longitude: 0 }
        );
    });

    it('should follow great circles instead of straight lines on a map', () => {
        // Reference: https://www.movable-type.co.uk/scripts/latlong.html
        expectCloseCoords(
            getIntersectionOfLines(
                { latitude: 51.8853, longitude: 0.2545 },
                { latitude: 50.26283803191378, longitude: 6.923953132974195 },
                { latitude: 49.0034, longitude: 2.5735 },
                { latitude: 52.729971259725666, longitude: 6.550714016584414 }
            ),
            { latitude: 50.9078, longitude: 4.5084 },
            4
        );
    });

    it('should return null if the lines do not cross', () => {
        // The great circles cross at 0, 0 but the lines end before
        expect(
            getIntersectionOfLines(
                { latitude: 0, longitude: 1 },
                { latitude: 0, longitude: 2 },
                { latitude: -1, longitude: 0 },
                { latitude: 1, longitude: 0 }
            )
        ).toBeNull();
    });

    it('should return null if the lines are on the same great circle', () => {
        expect(
            getIntersectionOfLines(
                { latitude: 0, longitude: 0 },
                { latitude: 0, longitude: 2 },
                { latitude: 0, longitude: 1 },
                { latitude: 0, longitude: 3 }
            )
        ).toBeNull();
    });

    it('should return null if a line has no length', () => {
        expect(
            getIntersectionOfLines(
                { latitude: 0, longitude: 0 },
                { latitude: 0, longitude: 0 },
                { latitude: -1, longitude: 0 },
                { latitude: 1, longitude: 0 }
            )
        ).toBeNull();
    });

    it('should return the end of a line that touches the other line', () => {
        expectCloseCoords(
            getIntersectionOfLines(
                { latitude: 0, longitude: -1 },
                { latitude: 0, longitude: 1 },
                { latitude: 0, longitude: 0 },
                { latitude: 1, longitude: 0 }
            ),
            { latitude: 0, longitude: 0 }
        );
    });

    it('should work with very short lines', () => {
        const meterInDegrees = 1 / ((6378137 * Math.PI) / 180);

        expectCloseCoords(
            getIntersectionOfLines(
                [-meterInDegrees, 50],
                [meterInDegrees, 50],
                [0, 50 - meterInDegrees],
                [0, 50 + meterInDegrees]
            ),
            { latitude: 50, longitude: 0 }
        );
    });

    it('should work across the antimeridian', () => {
        const intersection = getIntersectionOfLines(
            { latitude: 10, longitude: 170 },
            { latitude: -10, longitude: -170 },
            { latitude: -10, longitude: 170 },
            { latitude: 10, longitude: -170 }
        );

        expect(intersection.latitude).toBeCloseTo(0, 10);
        expect(Math.abs(intersection.longitude)).toBeCloseTo(180, 10);
    });

    it('should find short lines that end on another line', () => {
        const lineStart = { latitude: 10, longitude: 10 };
        const lineEnd = { latitude: 20, longitude: 25 };
        const bearing = getGreatCircleBearing(lineStart, lineEnd);

        for (let i = 1; i <= 20; i++) {
            // A point on the line and a line of 1 cm that ends there
            const touch = computeDestinationPoint(
                lineStart,
                i * 50000,
                bearing
            );
            const start = computeDestinationPoint(touch, 0.01, bearing + 90);

            expectCloseCoords(
                getIntersectionOfLines(lineStart, lineEnd, start, touch),
                touch
            );
        }
    });
});
