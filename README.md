# Geolib

A small library to provide some basic geo functions like distance calculation, conversion of decimal coordinates to sexagesimal and vice versa, etc.

[View demo](http://www.manuel-bieh.de/publikationen/scripts/geolib/demo.html)


## Methods

### getDistance(mixed, mixed, [mixed, [mixed, [int] ] ])

calculate the distance between two geo coordinates

Takes 2, 3, 4 or 5 parameters. Either 2 pairs of coordinates as string  or array or start latitude, start longitude, end latitude, end longitude as separate arguments. 3rd or 5th argument is accuracy (in meters). So a distance of 1248 meters with an accuracy of 100 is returned as 1200.

Return value is always an integer and represents the distance in meters.

#### Examples: 
<pre>geolib.getDistance("51.5103,7.49347", "51° 31' N, 7° 28' E")
geolib.getDistance([51.5103, 7.49347], ["51° 31' N", "7° 28' E"])
geolib.getDistance(51.5103, 7.49347, 55.751667, 37.617778)</pre>

### getCenter(array coords)

Calculates the geographical center of all points in a collection of geo coordinates

Takes an object or array of coordinates and calculates the center of it.

Return is an object: `{"lat": centerLat, "lng": centerLng, "distance": diagonalDistance}`

#### Examples

<pre>var spots = {
	"Brandenburg Gate, Berlin":"52.516272, 13.377722",
	"Dortmund U-Tower":"51.515, 7.453619",
	"London Eye": "51.503333, -0.119722",
	"Kremlin, Moscow":"55.751667, 37.617778",
	"Eiffel Tower, Paris":"48.8583, 2.2945",
	"Riksdag building, Stockholm":"59.3275, 18.0675",
	"Royal Palace, Oslo":"59.916911, 10.727567",
}

geolib.getCenter(spots);
geolib.getCenter([
	[52.516272, 13.377722], [51.515, 7.453619], [51.503333, -0.119722]
]);
</pre>

### convertUnit(string unit, float distance, int round)

Converts a given distance (in meters) to another unit.

#### Parameters

`unit` can be one of:
- m (meter)
- km (kilometer)
- cm (centimeter)
- mm (millimeter)
- mi (miles)
- sm (seamiles)
- ft (foot)
- in (inch)
- yd (yards)

`distance` distance to be converted (source must be in meter)

`round` fractional digits

#### Example

`geolib.convertUnit('km', 14213, 2) // -> 14,21`

### sexagesimal2decimal(string coord)

Converts a sexagesimal coordinate to decimal format

#### Example

`geolib.sexagesimal2decimal("51° 29' 46\" N")`

### decimal2sexagesimal(float coord)

Converts a decimal coordinate to sexagesimal format


#### Example

`geolib.decimal2sexagesimal(51.49611111); // -> 51° 29' 46.00`


### useDecimal(mixed coordinate)

Checks if a coordinate is already in decimal format and, if not, converts it to

#### Example

`geolib.useDecimal("51° 29' 46\" N") // -> 51.59611111`
`geolib.useDecimal(51.59611111) // -> 51.59611111`
