# Geolib

<!-- [![Build Status](https://secure.travis-ci.org/manuelbieh/Geolib.png?branch=master)](http://travis-ci.org/manuelbieh/Geolib) -->

Library to provide basic geospatial operations like distance calculation, conversion of decimal coordinates to sexagesimal and vice versa, etc.

## Install

```sh
npm install geolib
```

```sh
yarn add geolib
```

## Usage

There is a **UMD** build and an **ES Module** build. You can either use the UMD build in Node like any other library:

```js
const geolib = require('geolib');
```

or in the browser by using a simple script element:

```html
<script src="lib/geolib.js"></script>
```

If you load it in the browser, you can access all the functions via `window.geolib`.

If you're working with a bundler (like Webpack or Parcel) or have an environment that supports ES Modules natively, you can either import certain functions from the package directly:

```js
import { getDistance } from 'geolib';
```

or load the whole library:

```js
import * as geolib from 'geolib';
```

or you can import single functions directly to potentially make use of treeshaking (recommended):

```js
import getDistance from 'geolib/es/getDistance';
```

## General

This library is written in TypeScript. You don't have to know TypeScript to use Geolib but the [type definitions](./src/types.ts) give you valuable information about the general usage, input parameters etc.

All methods that are working with coordinates accept either an object with a `lat`/`latitude` **and** a `lon`/`lng`/`longitude` property, **or** a GeoJSON coordinates array, like: `[lon, lat]`. All values can be either in decimal (`53.471`) or sexagesimal (`53° 21' 16"`) format.

Distance values are **always** floats and represent the distance in **meters**.

## Functions

### `getDistance(start, end, accuracy = 1)`

Calculates the distance between two geo coordinates.

This function takes up to 3 arguments. First 2 arguments must be valid `GeolibInputCoordinates` (e.g. `{latitude: 52.518611, longitude: 13.408056}`). Coordinates can be in sexagesimal or decimal format. The third argument is accuracy (in meters). By default the accuracy is 1 meter. If you need a more accurate result, you can set it lower, e.g. to `0.01` for centimeter accuracy. You can set it higher to have the result rounded to the next value that is divisible by your chosen accuracy (e.g. `25428` with an accuracy of `100` becomes `25400`).

```js
getDistance(
    { latitude: 51.5103, longitude: 7.49347 },
    { latitude: "51° 31' N", longitude: "7° 28' E" }
);
```

```js
// Working with W3C Geolocation API
navigator.geolocation.getCurrentPosition(
    function(position) {
        console.log(
            'You are ',
            geolib.getDistance(position.coords, {
                latitude: 51.525,
                longitude: 7.4575,
            }),
            ' meters away from 51.525, 7.4575'
        );
    },
    function() {
        alert('Position could not be determined.');
    },
    {
        enableHighAccuracy: true,
    }
);
```

### `getPreciseDistance(start, end[, int accuracy])`

Calculates the distance between two geo coordinates. This method is more accurate then `getDistance`, especially for long distances but it is also slower. It is using the Vincenty inverse formula for ellipsoids.

It takes the same (up to 3) arguments as `getDistance`.

```js
getPreciseDistance(
    { latitude: 51.5103, longitude: 7.49347 },
    { latitude: "51° 31' N", longitude: "7° 28' E" }
);
```

### `getCenter(coords)`

Calculates the geographical center of all points in a collection of geo coordinates. Takes an array of coordinates and calculates the center of it.

Returns an object:

```js
{
    "latitude": centerLat,
    "longitude": centerLon
}
```

```js
geolib.getCenter([
    { latitude: 52.516272, longitude: 13.377722 },
    { latitude: 51.515, longitude: 7.453619 },
    { latitude: 51.503333, longitude: -0.119722 },
]);
```

### `getCenterOfBounds(coords)`

Calculates the center of the bounds of geo coordinates.

Takes an array of coordinates, calculate the border of those, and gives back
the center of that rectangle.

On polygons like political borders (eg. states), this may gives a closer
result to human expectation, than `getCenter`, because that function can be
disturbed by uneven distribution of point in different sides.

Imagine the US state Oklahoma: `getCenter` on that gives a southern
point, because the southern border contains a lot more nodes, than the others.

Returns an object: `{"latitude": centerLat, "longitude": centerLng}`

### geolib.getBounds(array coords)

Calculates the bounds of geo coordinates.

It returns maximum and minimum latitude and longitude in form of an object:

```js
{
    "minLat": minimumLatitude,
    "maxLat": maximumLatitude,
    "minLng": minimumLongitude,
    "maxLng": maximumLongitude,
}
```

```js
geolib.getBounds([
    { latitude: 52.516272, longitude: 13.377722 },
    { latitude: 51.515, longitude: 7.453619 },
    { latitude: 51.503333, longitude: -0.119722 },
]);
```

### geolib.isPointInside(object latlng, array polygon)

Checks whether a point is inside of a polygon or not.
Note: the polygon coords must be in correct order!

Returns true or false

#### Example

<pre>
geolib.isPointInside(
    {latitude: 51.5125, longitude: 7.485},
    [
        {latitude: 51.50, longitude: 7.40},
        {latitude: 51.555, longitude: 7.40},
        {latitude: 51.555, longitude: 7.625},
        {latitude: 51.5125, longitude: 7.625}
    ]
); // -> true</pre>

### geolib.isPointInCircle(object latlng, object center, integer radius)

Similar to is point inside: checks whether a point is inside of a circle or not.

Returns true or false

#### Example

<pre>// checks if 51.525, 7.4575 is within a radius of 5km from 51.5175, 7.4678
geolib.isPointInCircle(
    {latitude: 51.525, longitude: 7.4575},
    {latitude: 51.5175, longitude: 7.4678},
    5000
);</pre>

### geolib.getRhumbLineBearing(object originLL, object destLL)

Gets rhumb line bearing of two points. Find out about the difference between rhumb line and
great circle bearing on Wikipedia. Rhumb line should be fine in most cases:

http://en.wikipedia.org/wiki/Rhumb_line#General_and_mathematical_description

Function is heavily based on Doug Vanderweide's great PHP version (licensed under GPL 3.0)
http://www.dougv.com/2009/07/13/calculating-the-bearing-and-compass-rose-direction-between-two-latitude-longitude-coordinates-in-php/

Returns calculated bearing as integer.

#### Example

<pre>geolib.getRhumbLineBearing(
    {latitude: 52.518611, longitude: 13.408056}, 
    {latitude: 51.519475, longitude: 7.46694444}
);</pre>

### geolib.getBearing(object originLL, object destLL)

Gets great circle bearing of two points. See description of getRhumbLineBearing for more information.
Returns calculated bearing as integer.

#### Example

<pre>geolib.getBearing(
    {latitude: 52.518611, longitude: 13.408056}, 
    {latitude: 51.519475, longitude: 7.46694444}
);</pre>

### geolib.getCompassDirection(object originLL, object destLL, string bearingMode (optional))

Gets the compass direction from an origin coordinate (originLL) to a destination coordinate (destLL).
Bearing mode. Can be either circle or rhumbline (default).
Returns an object with a rough (NESW) and an exact direction (NNE, NE, ENE, E, ESE, etc).

#### Example

<pre>geolib.getCompassDirection(
    {latitude: 52.518611, longitude: 13.408056}, 
    {latitude: 51.519475, longitude: 7.46694444}
);
//Output
{
    rough: 'W',
    exact: 'WSW'
}</pre>

### geolib.orderByDistance(object latlng, mixed coords)

Sorts an object or array of coords by distance from a reference coordinate

Returns a sorted array [{latitude: x, longitude: y, distance: z, key: property}]

#### Examples

<pre>
// coords array
geolib.orderByDistance({latitude: 51.515, longitude: 7.453619}, [
    {latitude: 52.516272, longitude: 13.377722},
    {latitude: 51.518, longitude: 7.45425},
    {latitude: 51.503333, longitude: -0.119722}
]);

// coords object
geolib.orderByDistance({latitude: 51.515, longitude: 7.453619}, {
    a: {latitude: 52.516272, longitude: 13.377722},
    b: {latitude: 51.518, longitude: 7.45425},
    c: {latitude: 51.503333, longitude: -0.119722}
});
</pre>

### geolib.findNearest(object latlng, mixed coords[[, int offset], int limit])

Finds the nearest coordinate to a reference coordinate.

#### Examples

<pre>var spots = {
    "Brandenburg Gate, Berlin": {latitude: 52.516272, longitude: 13.377722},
    "Dortmund U-Tower": {latitude: 51.515, longitude: 7.453619},
    "London Eye": {latitude: 51.503333, longitude: -0.119722},
    "Kremlin, Moscow": {latitude: 55.751667, longitude: 37.617778},
    "Eiffel Tower, Paris": {latitude: 48.8583, longitude: 2.2945},
    "Riksdag building, Stockholm": {latitude: 59.3275, longitude: 18.0675},
    "Royal Palace, Oslo": {latitude: 59.916911, longitude: 10.727567}
}

// in this case set offset to 1 otherwise the nearest point will always be your reference point
geolib.findNearest(spots['Dortmund U-Tower'], spots, 1)
</pre>

### geolib.getPathLength(mixed coords)

Calculates the length of a collection of coordinates

Returns the length of the path in meters

#### Example

<pre>
// Calculate distance from Berlin via Dortmund to London
geolib.getPathLength([
    {latitude: 52.516272, longitude: 13.377722}, // Berlin
    {latitude: 51.515, longitude: 7.453619}, // Dortmund
    {latitude: 51.503333, longitude: -0.119722} // London
]); // -> 945235</pre>

### geolib.getSpeed(coords, coords[, options])

Calculates the speed between two points within a given time span.

Returns the speed in <em>options.unit</em> (default is km/h).

#### Example

<pre>
geolib.getSpeed(
    {lat: 51.567294, lng: 7.38896, time: 1360231200880},
    {lat: 52.54944, lng: 13.468509, time: 1360245600880},
    {unit: 'mph'}
); // -> 66.9408 (mph)</pre>

### geolib.isPointInLine(object point, object start, object end

Calculates if given point lies in a line formed by start and end.

Returns true or false

#### Examples

<pre>var point1 = {latitude: 0.5, longitude: 0};
var point2 = {latitude: 0, longitude: 10};
var point3 = {latitude: 0, longitude: 15.5};
var start  = {latitude: 0, longitude: 0};
var end    = {latitude: 0, longitude: 15};

var isInLine1 = geolib.isPointInLine(point1, start, end) //-> false;
var isInLine2 = geolib.isPointInLine(point2, start, end) //-> true;
var isInLine3 = geolib.isPointInLine(point3, start, end) //-> false;
</pre>

### geolib.convertUnit(string unit, float distance[, int round])

Converts a given distance (in meters) to another unit.

#### Parameters

`unit` can be one of:

-   m (meter)
-   km (kilometers)
-   cm (centimeters)
-   mm (millimeters)
-   mi (miles)
-   sm (seamiles)
-   ft (foot)
-   in (inch)
-   yd (yards)

`distance` distance to be converted (source must be in meter)

`round` fractional digits

#### Example

`geolib.convertUnit('km', 14213, 2) // -> 14,21`

### geolib.sexagesimal2decimal(string coord)

Converts a sexagesimal coordinate to decimal format

#### Example

`geolib.sexagesimal2decimal("51° 29' 46\" N")`

### geolib.decimal2sexagesimal(float coord)

Converts a decimal coordinate to sexagesimal format

#### Example

`geolib.decimal2sexagesimal(51.49611111); // -> 51° 29' 46.00`

### geolib.latitude(object latlng)

### geolib.longitude(object latlng)

### geolib.elevation(object latlng)

Returns the latitude/longitude/elevation for a given point and converts it to decimal.

Works with:

-   longitude: `longitude`, `lng`, `lon`, 0 (GeoJSON array)
-   latitude: `latitude`, `lat`, 1 (GeoJSON array)
-   elevation: `elevation`, `elev`, `alt`, `altitude`, 2 (GeoJSON array)

#### Examples

`geolib.latitude({lat: 51.49611, lng: 7.38896}); // -> 51.49611`
`geolib.longitude({lat: 51.49611, lng: 7.38896}); // -> 7.38896`

### geolib.useDecimal(mixed latlng)

Checks if a coordinate is already in decimal format and, if not, converts it to

#### Example

<pre>geolib.useDecimal("51° 29' 46\" N"); // -> 51.59611111
geolib.useDecimal(51.59611111) // -> 51.59611111</pre>

### geolib.computeDestinationPoint(start, distance, bearing, radius(optional))

Computes the destination point given an initial point, a distance (in meters) and a bearing (in degrees).

If no radius is given it defaults to the mean earth radius of 6371000 meter.

Returns an object: `{"latitude": destLat, "longitude": destLng}`

(Attention: this formula is not _100%_ accurate (but very close though))

#### Example

<pre>var initialPoint = {latitude: 51.516272, longitude: 0.45425}
var dist = 1234;
var bearing = 45;

geolib.computeDestinationPoint(initialPoint, dist, bearing);
// -> {"latitude":51.52411853234181,"longitude":0.4668623365950795}
</pre>

## Changelog

### v2.0.23+beta1

-   Dropped support for IE6, IE7, IE8
-   Added new methods `geolib.latitude()`, `geolib.longitude()`, `geolib.elevation()` to get latitude, longitude or elevation of points. Will be converted to decimal format automatically
-   Added new method `geolib.extend()` to extend geolib object
-   Added support for GeoJSON format (`[lon, lat, elev]`)
-   Added property `geolib.version` to query the currently used version
-   Moved `geolib.elevation` to an optional module (`geolib.elevation.js`)
-   Using `Object.create(Geolib.prototype)` instead of object literal `{}`
-   New folder structure: compiled `geolib.js` can now be found in `dist/` instead of root dir
-   Improved Grunt build task
