# Geolib
[![Build Status](https://secure.travis-ci.org/manuelbieh/Geolib.png?branch=master)](http://travis-ci.org/manuelbieh/Geolib)

A small library to provide some basic geo functions like distance calculation, conversion of decimal coordinates to sexagesimal and vice versa, etc.

[View demo](http://www.manuel-bieh.de/publikationen/scripts/geolib/demo.html)

## Methods

### geolib.getDistance(object start, object end, [int accuracy])

Calculates the distance between two geo coordinates

Takes 2 or 3. First 2 arguments must be an object with a latitude and a longitude property (e.g. {latitude: 52.518611, longitude: 13.408056}). Coordinates can be in sexagesimal or decimal format. 3rd argument is accuracy (in meters). So a calculated distance of 1248 meters with an accuracy of 100 is returned as 1200.

Return value is always an integer and represents the distance in meters.

#### Examples

<pre>geolib.getDistance(
	{latitude: 51.5103, longitude: 7.49347}, 
	{latitude: "51° 31' N", longitude: "7° 28' E"}
);
geolib.getDistance(
	{latitude: 51.5103, longitude: 7.49347}, 
	{latitude: "51° 31' N", longitude: "7° 28' E"}
);

// Working with W3C Geolocation API
navigator.geolocation.getCurrentPosition(
	function(position) {
		alert('You are ' + geolib.getDistance(position.coords, {
			latitude: 51.525, 
			longitude: 7.4575
		}) + ' meters away from 51.525, 7.4575');
	}, 
	function() { 
		alert('Position could not be determined.')
	}, 
	{
		enableHighAccuracy: true
	}
);
</pre>

### geolib.getCenter(array coords)

Calculates the geographical center of all points in a collection of geo coordinates

Takes an object or array of coordinates and calculates the center of it.

Returns an object: `{"latitude": centerLat, "longitude": centerLng, "distance": diagonalDistance}`

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

geolib.getCenter(spots);
geolib.getCenter([
	{latitude: 52.516272, longitude: 13.377722}, 
	{latitude: 51.515, longitude: 7.453619}, 
	{latitude: 51.503333, longitude: -0.119722}
]);
</pre>

### geolib.isPointInside(object latlng, array coords)

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

<h3>geolib.isPointInCircle(object latlng, object center, integer radius)</h3>

Similar to is point inside: checks whether a point is inside of a circle or not. 

Returns true or false

<h4>Example</h4>

<pre>// checks if 51.525, 7.4575 is within a radius of 5km from 51.5175, 7.4678
geolib.isPointInCircle(
	{latitude: 51.525, longitude: 7.4575},
	{latitude: 51.5175, longitude: 7.4678}, 
	5000
);</pre>

<h3>geolib.orderByDistance(object latlng, mixed coords)</h3>

Sorts an object or array of coords by distance from a reference coordinate

Returns a sorted array [{latitude: x, longitude: y, distance: z, key: property}]

<h4>Examples</h4>

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

### geolib.findNearest(object latlng, mixed coords, int offset)

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

Returns the length of the path in kilometers

#### Example

<pre>
// Calculate distance from Berlin via Dortmund to London
geolib.getPathLength([
	{latitude: 52.516272, longitude: 13.377722}, // Berlin
	{latitude: 51.515, longitude: 7.453619}, // Dortmund
	{latitude: 51.503333, longitude: -0.119722} // London
]); // -> 945235</pre>

### geolib.convertUnit(string unit, float distance, [int round])

Converts a given distance (in meters) to another unit.

#### Parameters

`unit` can be one of:

- m (meter)
- km (kilometers)
- cm (centimeters)
- mm (millimeters)
- mi (miles)
- sm (seamiles)
- ft (foot)
- in (inch)
- yd (yards)

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


### geolib.useDecimal(mixed coordinate)

Checks if a coordinate is already in decimal format and, if not, converts it to

#### Example
<pre>geolib.useDecimal("51° 29' 46\" N"); // -> 51.59611111
geolib.useDecimal(51.59611111) // -> 51.59611111</pre>
