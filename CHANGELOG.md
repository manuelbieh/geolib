# Changelog

## Breaking Changes in 3.0.0 and migration from 2.x.x

In version 3.0.0 I'm trying to get a little bit _back to the roots_. **Geolib** was once started because I needed a handful of methods to perform very specific geo related tasks like getting the distance or the direction between two points. Since it was one of the very first libraries on npm back then to do these kind of things in a very simple way it became very popular (with more than 300k downloads per month as of April 2019!) and as a consequence got a lot of contributions over the years. Many of which I just merged as long as they had accompanying tests, without looking at consistency, conventions, complexity, coding style or even the overall quality of the functions that I sometimes didn't even fully understand.

I have now cleaned up the codebase completely, rebuilt the entire library "from scratch", unified all the function arguments, removed a few functions where I wasn't sure if they should be in here (feel free to add them back of you're using them!) or if they were even used (did a few searches on GitHub for the function names, turned out there are zero results).

Elevation support was dropped, as well as a few functions that unnecessarily made the library really large in size (e.g. `isPointInsideRobust` alone was over 700[!] lines of code and was basically taken from a [different library](https://github.com/mikolalysenko/robust-point-in-polygon)).

I removed Grunt from the build process, added "modern" tools like ESLint and Prettier. I switched from Travis CI to Circle CI and I am in the process of further automating the release process of new versions using `semantic-release` and `conventional-commits`. I also switched from pure JavaScript to TypeScript because I think it does have some benefits.

-   All functions are pure functions now. No input data is mutated anymore. You give the same input, you get the same output. No side effects or whatsoever.
-   I changed the default `getDistance` function from being the slow, accurate one to being the fast, slightly inaccurate one. The old `getDistance` function is now named `getPreciseDistance` while the old `getDistanceSimple` function is now the default `getDistance` function. You can, however, pass `getPreciseDistance` as argument to any function that uses distance calculation internally.
-   Artificial limitation to 8 decimal places in decimal coordinates was removed
-   `getBoundsOfDistance()` now returns the _exact_ coordinates due to the removal of the artificial 8 decimal place limitation
-   `getCompassDirection()` does no longer return an object with an _exact_ and a _rough_ direction but only the exact direction as string
-   third argument to `getCompassDirection()` is no longer a string ("circle", "line") but a function to determine the bearing (you can pass `getRhumbLineBearing` or `getGreatCircleBearing`). The function receives the origin and the destination as first and second argument. If no 3rd argument was given, `getRhumbLineBearing(origin, dest)` is used by default.
-   There is now a new helper function `roughCompassDirection(exact)` if you _really_ only need a very rough (and potentially inaccurate or inappropriate) direction. Better don't use it.
-   `orderByDistance()` does no longer modify its input so does not add a `distance` and `key` property to the returned coordinates.
-   The result of `getSpeed()` is now always returned as **meters per second**. It can be converted using the new convenience function `convertSpeed(mps, targetUnit)`
-   Relevant value (usually point or distance) is now consistently the **first** argument for each function (it wasn't before, how confusing is that?)
-   `findNearest()` does no longer take `offset` and `limit` arguments. It's only a convenience method to get the single one nearest point from a set of coordinates. If you need more than one, have a look at the implementation and implement your own logic using `orderByDistance`
-   Whereever distances are involved, they are returned as meters or meters per second. No more inconsistent defaults like kilometers or kilometers per hour.
-   The method how sexagesimal is formatted differs a little bit. It may now potentially return ugly float point units like `52° 46' 21.0004"` in rare cases but it is also more accurate than it was before.
-   Dropped support for Meteor (feel free to add it back if you like)

### ✅ Functions with the same name

-   `computeDestinationPoint`
-   `getBounds`
-   `getBoundsOfDistance`
-   `getCenter`
-   `getCenterOfBounds`
-   `getCompassDirection`
-   `getDistanceFromLine`
-   `getPathLength`
-   `getRhumbLineBearing`
-   `getSpeed`
-   `isDecimal`
-   `isPointInLine`
-   `isPointNearLine`
-   `isSexagesimal`
-   `orderByDistance`

### ❗ Renamed functions

-   `getKeys` renamed to `getCoordinateKeys`
-   `validate` renamed to `isValidCoordinate`
-   `getLat` renamed to `getLatitude`
-   `getLon` renamed to `getLongitude`
-   `latitude` -> renamed to `getLatitude`
-   `longitude` -> renamed to `getLongitude`
-   `convertUnit` -> remamed to convertDistance, because name was too ambiguous
-   `useDecimal` renamed to `toDecimal`
-   `decimal2sexagesimal` renamed to `decimalToSexagesimal`
-   `sexagesimal2decimal` renamed to `sexagesimalToDecimal`
-   `getDistance` renamed to `getPreciseDistance`
-   `getDistanceSimple` renamed to `getDistance`
-   `isPointInside` renamed to `isPointInPolygon`
-   `isPointInCircle` renamed to `isPointWithinRadius`
-   `getBearing` renamed to `getGreatCircleBearing` to be more explicit

### 🗑 Removed functions

-   `getElev` -> removed
-   `elevation` -> removed
-   `coords` -> removed (might be re-added as getCoordinate or getNormalizedCoordinate)
-   `ll` -> removed (because wtf?)
-   `preparePolygonForIsPointInsideOptimized` -> removed due to missing documentation and missing tests
-   `isPointInsideWithPreparedPolygon` -> removed due to missing documentation
-   `isInside` alias -> removed (too ambiguous) - use `isPointInPolygon` or `isPointWithinRadius`
-   `withinRadius` -> removed, use `isPointWithinRadius`
-   `getDirection` alias -> removed (unnecessary clutter) - use `getCompassDirection`

### 🆕 Added functions

-   `getAreaOfPolygon` to calculate the area of a polygon
-   `getCoordinateKey` to get a property name (e.g. `lat` or `lng` of an object based on an array of possible names)

## v2.0.24

-   Dropped support for IE6, IE7, IE8
-   Added new methods `geolib.latitude()`, `geolib.longitude()`, `geolib.elevation()` to get latitude, longitude or elevation of points. Will be converted to decimal format automatically
-   Added new method `geolib.extend()` to extend geolib object
-   Added support for GeoJSON format (`[lon, lat, elev]`)
-   Added property `geolib.version` to query the currently used version
-   Moved `geolib.elevation` to an optional module (`geolib.elevation.js`)
-   Using `Object.create(Geolib.prototype)` instead of object literal `{}`
-   New folder structure: compiled `geolib.js` can now be found in `dist/` instead of root dir
-   Improved Grunt build task
