import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import toRad from './toRad';
import toDeg from './toDeg';
import { GeolibInputCoordinates } from './types';

type Vector = [number, number, number];

// Tolerance (in radians, about 6 µm) for points that lie exactly at the end
// of a line
const EPSILON = 1e-12;

// Unit vector from the center of the earth to the point
const toVector = (point: GeolibInputCoordinates): Vector => {
    const latitude = toRad(getLatitude(point));
    const longitude = toRad(getLongitude(point));
    return [
        Math.cos(latitude) * Math.cos(longitude),
        Math.cos(latitude) * Math.sin(longitude),
        Math.sin(latitude),
    ];
};

const cross = ([ax, ay, az]: Vector, [bx, by, bz]: Vector): Vector => [
    ay * bz - az * by,
    az * bx - ax * bz,
    ax * by - ay * bx,
];

const dot = (a: Vector, b: Vector) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

// Normal of the great circle through two points. Equal to 2·(a × b), but
// a × b loses most of its precision for points that are close together.
// The computed great circle then misses its own end points.
const getNormal = (a: Vector, b: Vector) =>
    cross(
        [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
        [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
    );

// Returns null for vectors that are (almost) zero and have no direction
const normalize = (vector: Vector): Vector | null => {
    const length = Math.sqrt(dot(vector, vector));
    return length < EPSILON
        ? null
        : [vector[0] / length, vector[1] / length, vector[2] / length];
};

// Checks if a point on the great circle through start and end lies on the
// shorter arc between them. `normal` is the unit normal of that great
// circle.
const isOnLine = (start: Vector, end: Vector, normal: Vector, point: Vector) =>
    dot(cross(start, point), normal) >= -EPSILON &&
    dot(cross(point, end), normal) >= -EPSILON;

// Calculates the point where two lines cross. Each line is the shortest
// path along the surface of the earth (a great circle arc) between its
// start and end. Returns null if the lines don't cross, if they lie on the
// same great circle, or if one of them has no length.
const getIntersectionOfLines = (
    line1Start: GeolibInputCoordinates,
    line1End: GeolibInputCoordinates,
    line2Start: GeolibInputCoordinates,
    line2End: GeolibInputCoordinates
) => {
    const start1 = toVector(line1Start);
    const end1 = toVector(line1End);
    const start2 = toVector(line2Start);
    const end2 = toVector(line2End);

    const normal1 = normalize(getNormal(start1, end1));
    const normal2 = normalize(getNormal(start2, end2));

    if (normal1 === null || normal2 === null) {
        return null;
    }

    // Two great circles cross in two opposite points
    const intersection = normalize(cross(normal1, normal2));

    if (intersection === null) {
        return null;
    }

    const candidates: Vector[] = [
        intersection,
        [-intersection[0], -intersection[1], -intersection[2]],
    ];

    for (const candidate of candidates) {
        if (
            isOnLine(start1, end1, normal1, candidate) &&
            isOnLine(start2, end2, normal2, candidate)
        ) {
            const [x, y, z] = candidate;
            return {
                latitude: toDeg(Math.atan2(z, Math.sqrt(x * x + y * y))),
                longitude: toDeg(Math.atan2(y, x)),
            };
        }
    }

    return null;
};

export default getIntersectionOfLines;
