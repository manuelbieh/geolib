// Content of the API reference. Every example is editable on the page and
// runs against the published package. The value of the last expression is
// shown as the result.

export const pointsExample = {
    name: 'points',
    code: `const paris = [2.3522, 48.8566];

[
    { latitude: 52.5163, longitude: 13.3777 },
    { lat: 52.5163, lng: 13.3777 },
    { lat: '52.5163', lon: '13.3777' },
    [13.3777, 52.5163], // GeoJSON: longitude first
    { latitude: '52° 30′ 58.68″ N', longitude: '13° 22′ 39.72″ E' },
].map((brandenburgGate) => getDistance(brandenburgGate, paris));`,
};

export const groups = [
    {
        id: 'distance',
        title: 'Distance',
        intro: 'All distances are in meters. Functions that compare several distances accept a distance function as an argument, so you can switch to the more precise <code>getPreciseDistance</code> wherever you need it.',
        functions: [
            {
                name: 'getDistance',
                signature: 'getDistance(from, to, accuracy = 1)',
                description:
                    '<p>Calculates the distance between two points using the haversine formula. It treats the earth as a sphere, which makes it fast and accurate to within about 0.5%.</p><p>The result is rounded to <code>accuracy</code> meters. Pass <code>0.01</code> for centimeters, <code>100</code> to round to the nearest 100 meters, or <code>0</code> to turn rounding off.</p>',
                code: `getDistance(
    { latitude: 52.5200, longitude: 13.4050 }, // Berlin
    { latitude: 48.8566, longitude: 2.3522 }   // Paris
);`,
            },
            {
                name: 'getPreciseDistance',
                signature: 'getPreciseDistance(from, to, accuracy = 1)',
                description:
                    '<p>Calculates the distance between two points using the Vincenty inverse formula on the WGS 84 ellipsoid. It is more accurate than <code>getDistance</code>, especially over long distances, but also slower.</p>',
                code: `const berlin = { latitude: 52.5200, longitude: 13.4050 };
const sydney = { latitude: -33.8688, longitude: 151.2093 };

({
    haversine: getDistance(berlin, sydney),
    vincenty: getPreciseDistance(berlin, sydney),
});`,
            },
            {
                name: 'getPathLength',
                signature: 'getPathLength(points, distanceFunction = getDistance)',
                description:
                    '<p>Adds up the distances between consecutive points of a path.</p>',
                code: `getPathLength([
    { latitude: 52.5163, longitude: 13.3777 }, // Brandenburg Gate
    { latitude: 52.5186, longitude: 13.3762 }, // Reichstag
    { latitude: 52.5208, longitude: 13.4094 }, // TV Tower
]);`,
            },
            {
                name: 'getDistanceFromLine',
                signature: 'getDistanceFromLine(point, lineStart, lineEnd, accuracy = 1)',
                description:
                    '<p>Calculates the shortest distance from a point to the line between two other points. The result is rounded like in <code>getDistance</code>.</p>',
                code: `getDistanceFromLine(
    { latitude: 51.516, longitude: 7.456 },
    { latitude: 51.512, longitude: 7.456 },
    { latitude: 51.516, longitude: 7.459 }
);`,
            },
            {
                name: 'orderByDistance',
                signature: 'orderByDistance(point, points, distanceFunction = getDistance)',
                description:
                    '<p>Sorts points by their distance to a reference point. The points come back unchanged, including any other properties they have.</p>',
                code: `const here = { latitude: 52.5200, longitude: 13.4050 };

orderByDistance(here, [
    { name: 'Hamburg', latitude: 53.5511, longitude: 9.9937 },
    { name: 'Munich', latitude: 48.1351, longitude: 11.5820 },
    { name: 'Leipzig', latitude: 51.3397, longitude: 12.3731 },
]).map((city) => city.name);`,
            },
            {
                name: 'findNearest',
                signature: 'findNearest(point, points)',
                description:
                    '<p>Returns the point that is closest to the reference point.</p>',
                code: `findNearest({ latitude: 52.456221, longitude: 12.63128 }, [
    { name: 'Berlin', latitude: 52.516272, longitude: 13.377722 },
    { name: 'Dortmund', latitude: 51.515, longitude: 7.453619 },
    { name: 'London', latitude: 51.503333, longitude: -0.119722 },
    { name: 'Moscow', latitude: 55.751667, longitude: 37.617778 },
]);`,
            },
            {
                name: 'isPointWithinRadius',
                signature: 'isPointWithinRadius(point, center, radius)',
                description:
                    '<p>Checks whether a point is less than <code>radius</code> meters away from a center point.</p>',
                code: `isPointWithinRadius(
    { latitude: 51.525, longitude: 7.4575 },
    { latitude: 51.5175, longitude: 7.4678 },
    5000
);`,
            },
            {
                name: 'getSpeed',
                signature: 'getSpeed(start, end, distanceFunction = getDistance)',
                description:
                    '<p>Calculates the average speed between two points in meters per second. Each point needs a <code>time</code> property with a timestamp in milliseconds. Use <a href="#convertSpeed"><code>convertSpeed</code></a> to get km/h or mph.</p>',
                code: `const speed = getSpeed(
    { latitude: 51.567294, longitude: 7.38896, time: 1360231200880 },
    { latitude: 52.54944, longitude: 13.468509, time: 1360245600880 }
);

convertSpeed(speed, 'kmh');`,
            },
        ],
    },
    {
        id: 'direction',
        title: 'Direction',
        intro: 'Bearings are in degrees, clockwise from north. A <em>great circle</em> is the shortest route between two points, and its bearing changes along the way. A <em>rhumb line</em> keeps the same bearing the whole time, which makes it longer but easier to follow.',
        functions: [
            {
                name: 'getGreatCircleBearing',
                signature: 'getGreatCircleBearing(origin, destination)',
                description:
                    '<p>Returns the initial bearing of the great circle route from origin to destination.</p>',
                code: `getGreatCircleBearing(
    { latitude: 52.5200, longitude: 13.4050 }, // Berlin
    { latitude: 35.6762, longitude: 139.6503 } // Tokyo
);`,
            },
            {
                name: 'getRhumbLineBearing',
                signature: 'getRhumbLineBearing(origin, destination)',
                description:
                    '<p>Returns the constant bearing of the rhumb line from origin to destination.</p>',
                code: `getRhumbLineBearing(
    { latitude: 52.5200, longitude: 13.4050 }, // Berlin
    { latitude: 35.6762, longitude: 139.6503 } // Tokyo
);`,
            },
            {
                name: 'getCompassDirection',
                signature: 'getCompassDirection(origin, destination, bearingFunction = getRhumbLineBearing)',
                description:
                    '<p>Returns one of the 16 compass directions (<code>N</code>, <code>NNE</code>, <code>NE</code>, …) from origin to destination. Pass <code>getGreatCircleBearing</code> as third argument to use the initial great circle bearing instead.</p>',
                code: `getCompassDirection(
    { latitude: 52.518611, longitude: 13.408056 },
    { latitude: 51.519475, longitude: 7.46694444 }
);`,
            },
            {
                name: 'getRoughCompassDirection',
                signature: 'getRoughCompassDirection(direction)',
                description:
                    '<p>Reduces a compass direction like <code>WNW</code> to one of <code>N</code>, <code>E</code>, <code>S</code> or <code>W</code>.</p>',
                code: `getRoughCompassDirection('WNW');`,
            },
            {
                name: 'computeDestinationPoint',
                signature: 'computeDestinationPoint(start, distance, bearing, radius = earthRadius)',
                description:
                    '<p>Calculates where you end up when you travel <code>distance</code> meters from a start point with the given bearing.</p>',
                code: `// 15 km south of Berlin
computeDestinationPoint(
    { latitude: 52.518611, longitude: 13.408056 },
    15000,
    180
);`,
            },
        ],
    },
    {
        id: 'shapes',
        title: 'Areas, bounds and lines',
        intro: 'Polygons are arrays of points. They are closed implicitly, so the last point doesn’t need to repeat the first one.',
        functions: [
            {
                name: 'getAreaOfPolygon',
                signature: 'getAreaOfPolygon(points)',
                description:
                    '<p>Calculates the surface area of a polygon in square meters. Use <a href="#convertArea"><code>convertArea</code></a> for other units.</p>',
                code: `// The four corners of Central Park, New York
const area = getAreaOfPolygon([
    [-73.9819, 40.7681],
    [-73.9730, 40.7644],
    [-73.9496, 40.7968],
    [-73.9581, 40.8006],
]);

convertArea(area, 'ha');`,
            },
            {
                name: 'isPointInPolygon',
                signature: 'isPointInPolygon(point, polygon)',
                description:
                    '<p>Checks whether a point lies inside a polygon. The vertices must be in order along the outline, clockwise or counterclockwise. Polygons may cross the antimeridian.</p>',
                code: `isPointInPolygon({ latitude: 51.5125, longitude: 7.485 }, [
    { latitude: 51.5, longitude: 7.4 },
    { latitude: 51.555, longitude: 7.4 },
    { latitude: 51.555, longitude: 7.625 },
    { latitude: 51.5125, longitude: 7.625 },
]);`,
            },
            {
                name: 'getBounds',
                signature: 'getBounds(points)',
                description:
                    '<p>Returns the smallest and largest latitude and longitude of a set of points.</p>',
                code: `getBounds([
    { latitude: 52.516272, longitude: 13.377722 },
    { latitude: 51.515, longitude: 7.453619 },
    { latitude: 51.503333, longitude: -0.119722 },
]);`,
            },
            {
                name: 'isPointInBoundingBox',
                signature: 'isPointInBoundingBox(point, bounds)',
                description:
                    '<p>Checks whether a point lies inside a bounding box like the one <code>getBounds</code> returns. Points on the edge count as inside. If <code>minLng</code> is greater than <code>maxLng</code>, the box crosses the antimeridian.</p>',
                code: `isPointInBoundingBox(
    { latitude: 51.5125, longitude: 7.485 },
    { minLat: 51.5, maxLat: 51.555, minLng: 7.4, maxLng: 7.625 }
);`,
            },
            {
                name: 'getBoundsOfDistance',
                signature: 'getBoundsOfDistance(point, distance)',
                description:
                    '<p>Returns the southwest and northeast corners of a box that contains every point within <code>distance</code> meters of the given point. Useful to prefilter a database query before calculating exact distances.</p>',
                code: `getBoundsOfDistance(
    { latitude: 34.090166, longitude: -118.276736 },
    1000
);`,
            },
            {
                name: 'getCenter',
                signature: 'getCenter(points)',
                description:
                    '<p>Calculates the geographic midpoint of a set of points. Areas with many points pull the result towards them. Returns <code>false</code> for an empty array.</p>',
                code: `getCenter([
    { latitude: 52.516272, longitude: 13.377722 },
    { latitude: 51.515, longitude: 7.453619 },
    { latitude: 51.503333, longitude: -0.119722 },
]);`,
            },
            {
                name: 'getCenterOfBounds',
                signature: 'getCenterOfBounds(points)',
                description:
                    '<p>Calculates the center of the bounding box of a set of points. For outlines like country borders, which have more points on some sides than on others, this is often closer to what people expect than <code>getCenter</code>.</p>',
                code: `getCenterOfBounds([
    { latitude: 51.513357512, longitude: 7.45574331 },
    { latitude: 51.515400598, longitude: 7.45518541 },
    { latitude: 51.516241842, longitude: 7.456494328 },
    { latitude: 51.516722545, longitude: 7.459863183 },
    { latitude: 51.517443592, longitude: 7.463232037 },
]);`,
            },
            {
                name: 'getIntersectionOfLines',
                signature: 'getIntersectionOfLines(line1Start, line1End, line2Start, line2End)',
                description:
                    '<p>Returns the point where two lines cross, or <code>null</code> if they don’t. Each line is the shortest route between its ends, so it is curved on most maps.</p>',
                code: `// Berlin to Munich and Cologne to Dresden
getIntersectionOfLines(
    { latitude: 52.5162, longitude: 13.3777 },
    { latitude: 48.1374, longitude: 11.5755 },
    { latitude: 50.9375, longitude: 6.9603 },
    { latitude: 51.0504, longitude: 13.7373 }
);`,
            },
            {
                name: 'isPointInLine',
                signature: 'isPointInLine(point, lineStart, lineEnd)',
                description:
                    '<p>Checks whether a point lies on the line between two other points. It counts as on the line if its distance to it rounds to 0 meters.</p>',
                code: `isPointInLine(
    { latitude: 0, longitude: 10 },
    { latitude: 0, longitude: 0 },
    { latitude: 0, longitude: 15 }
);`,
            },
            {
                name: 'isPointNearLine',
                signature: 'isPointNearLine(point, lineStart, lineEnd, distance)',
                description:
                    '<p>Checks whether a point is less than <code>distance</code> meters away from the line between two other points.</p>',
                code: `isPointNearLine(
    { latitude: 51.516, longitude: 7.456 },
    { latitude: 51.512, longitude: 7.456 },
    { latitude: 51.516, longitude: 7.459 },
    200
);`,
            },
            {
                name: 'wktToPolygon',
                signature: 'wktToPolygon(wkt)',
                description:
                    '<p>Converts a polygon in <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">well-known text</a> format to an array of points. Only the outer ring is returned; holes are ignored.</p>',
                code: `wktToPolygon('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))');`,
            },
        ],
    },
    {
        id: 'units',
        title: 'Units',
        intro: 'Geolib calculates in meters, square meters and meters per second. These functions convert the results.',
        functions: [
            {
                name: 'convertDistance',
                signature: "convertDistance(meters, unit = 'm')",
                description:
                    '<p>Converts meters to <code>km</code>, <code>cm</code>, <code>mm</code>, <code>mi</code> (miles), <code>sm</code> (sea miles), <code>ft</code>, <code>in</code> or <code>yd</code>. Throws an error for unknown units.</p>',
                code: `convertDistance(42195, 'mi');`,
            },
            {
                name: 'convertArea',
                signature: "convertArea(squareMeters, unit = 'm2')",
                description:
                    '<p>Converts square meters to <code>km2</code>, <code>ha</code> (hectares), <code>a</code> (ares), <code>ft2</code>, <code>yd2</code> or <code>in2</code>. <code>sqm</code>, <code>sqkm</code>, <code>sqft</code>, <code>sqyd</code> and <code>sqin</code> work as well. Throws an error for unknown units.</p>',
                code: `convertArea(298678, 'km2');`,
            },
            {
                name: 'convertSpeed',
                signature: "convertSpeed(metersPerSecond, unit = 'kmh')",
                description:
                    '<p>Converts meters per second to <code>kmh</code> or <code>mph</code>.</p>',
                code: `convertSpeed(29.8678, 'mph');`,
            },
        ],
    },
    {
        id: 'formats',
        title: 'Coordinate formats',
        intro: 'Coordinates can be decimal numbers (<code>52.5163</code>) or sexagesimal strings with degrees, minutes and seconds (<code>52° 30′ 59″ N</code>). Every function accepts both.',
        functions: [
            {
                name: 'sexagesimalToDecimal',
                signature: 'sexagesimalToDecimal(value)',
                description:
                    '<p>Converts a sexagesimal value to a decimal number. Southern and western values become negative.</p>',
                code: `sexagesimalToDecimal('33° 52\\' 07.68" S');`,
            },
            {
                name: 'decimalToSexagesimal',
                signature: 'decimalToSexagesimal(value)',
                description:
                    '<p>Converts a decimal number to a sexagesimal string. The result has no sign, because the hemisphere is usually written as a letter. The function can’t know whether a value is a latitude or a longitude, so add the letter yourself.</p>',
                code: `const latitude = -33.8688;

\`\${decimalToSexagesimal(latitude)} \${latitude < 0 ? 'S' : 'N'}\`;`,
            },
            {
                name: 'toDecimal',
                signature: 'toDecimal(value)',
                description:
                    '<p>Converts a value, a point or an array of points to decimal format. Values that are decimal already are returned as numbers.</p>',
                code: `toDecimal({ lat: '51° 29\\' 46" N', lng: '7° 23\\' 20" E' });`,
            },
            {
                name: 'getLatitude',
                signature: 'getLatitude(point, raw = false)',
                description:
                    '<p>Returns the latitude of a point as a decimal number, whatever property name or format it uses. Pass <code>true</code> as second argument to get the value unconverted.</p>',
                code: `getLatitude({ lat: '51° 29\\' 46" N', lng: 7.38896 });`,
            },
            {
                name: 'getLongitude',
                signature: 'getLongitude(point, raw = false)',
                description:
                    '<p>Returns the longitude of a point as a decimal number. Works like <code>getLatitude</code>.</p>',
                code: `getLongitude([7.38896, 51.49611]); // GeoJSON: [lon, lat]`,
            },
            {
                name: 'isDecimal',
                signature: 'isDecimal(value)',
                description:
                    '<p>Checks whether a value is a decimal number or a string that contains one.</p>',
                code: `[isDecimal(51.49611), isDecimal('51.49611'), isDecimal('51° 29\\' 46" N')];`,
            },
            {
                name: 'isSexagesimal',
                signature: 'isSexagesimal(value)',
                description:
                    '<p>Checks whether a value is a sexagesimal string.</p>',
                code: `[isSexagesimal('51° 29\\' 46" N'), isSexagesimal(51.49611)];`,
            },
            {
                name: 'getCoordinateKeys',
                signature: 'getCoordinateKeys(point)',
                description:
                    '<p>Returns the property names a point uses for its latitude and longitude. For GeoJSON arrays, these are the indexes.</p>',
                code: `getCoordinateKeys({ lat: 1, lon: 1 });`,
            },
            {
                name: 'getCoordinateKey',
                signature: 'getCoordinateKey(point, keysToLookup)',
                description:
                    '<p>Returns the first name in <code>keysToLookup</code> that the point has as a property, or <code>undefined</code>.</p>',
                code: `getCoordinateKey({ latitude: 1, longitude: 2 }, ['lat', 'latitude']);`,
            },
        ],
    },
    {
        id: 'validation',
        title: 'Validation',
        intro: 'These functions never throw. They return <code>false</code> for anything they can’t read, including <code>null</code> and <code>undefined</code>.',
        functions: [
            {
                name: 'isValidCoordinate',
                signature: 'isValidCoordinate(point)',
                description:
                    '<p>Checks whether a point has a valid latitude and longitude in a supported format.</p>',
                code: `[
    isValidCoordinate({ latitude: 52.52, longitude: 13.405 }),
    isValidCoordinate([13.405, 52.52]),
    isValidCoordinate({ latitude: 52.52 }),
    isValidCoordinate({ latitude: 152.52, longitude: 13.405 }),
];`,
            },
            {
                name: 'isValidLatitude',
                signature: 'isValidLatitude(value)',
                description:
                    '<p>Checks whether a value is a latitude between -90 and 90, in decimal or sexagesimal format.</p>',
                code: `[isValidLatitude(52.52), isValidLatitude(-91), isValidLatitude('52° 31\\' N')];`,
            },
            {
                name: 'isValidLongitude',
                signature: 'isValidLongitude(value)',
                description:
                    '<p>Checks whether a value is a longitude between -180 and 180, in decimal or sexagesimal format.</p>',
                code: `[isValidLongitude(13.405), isValidLongitude(181)];`,
            },
        ],
    },
    {
        id: 'math',
        title: 'Angles and constants',
        intro: '',
        functions: [
            {
                name: 'toRad',
                signature: 'toRad(degrees)',
                description: '<p>Converts degrees to radians.</p>',
                code: `toRad(180);`,
            },
            {
                name: 'toDeg',
                signature: 'toDeg(radians)',
                description: '<p>Converts radians to degrees.</p>',
                code: `toDeg(Math.PI / 2);`,
            },
            {
                name: 'constants',
                title: 'Constants',
                signature: 'earthRadius, MINLAT, MAXLAT, MINLON, MAXLON, …',
                description:
                    '<p>Geolib exports the constants it uses internally: <code>earthRadius</code> (in meters), the valid ranges of latitude and longitude, <code>DEG_TO_RAD</code> and <code>RAD_TO_DEG</code>, the conversion tables <code>distanceConversion</code>, <code>areaConversion</code> and <code>timeConversion</code>, the property names in <code>latitudeKeys</code>, <code>longitudeKeys</code> and <code>altitudeKeys</code>, and the <code>sexagesimalPattern</code> regular expression.</p>',
                code: `({ earthRadius, MINLAT, MAXLAT, MINLON, MAXLON });`,
            },
        ],
    },
];
