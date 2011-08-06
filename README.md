# Geolib

A small library to provide some basic geo functions like distance calculation, conversion of decimal coordinates to sexagesimal and vice versa, etc.

## Usage:

To calculate distance between two geo coordinates

`geolib.getDistance("51.511928,7.463536", "51.510318,7.524133", 10); // -> 4200 (Accuracy 10m)`

or

`geolib.getDistance(51.511928, 7.463536, 51.510318, 7.524133); // -> 4202`

Start and end coordinates can be passed as comma separated string `("startLat,startLng","endLat,endLng")` or as own parameter `(startLat, startLng, endLat, endLng)`.

Return value is always an integer and represents the distance in meters. To convert it into miles use

`geolib.convertUnit('mi', value)`

Convert sexagesimal to decimal

`geolib.sexagesimal2decimal("51° 29' 46\" N"); // -> 51.49611111`

Convert decimal to sexagesimal

`geolib.decimal2sexagesimal(51.49611111`); // -> 51° 29' 46.00

[View demo](http://www.manuel-bieh.de/publikationen/scripts/geolib/demo.html)