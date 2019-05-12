# Breaking Changes in 3.0.0

In version 3.0.0 I'm trying to get a little bit _back to the roots_. Geolib was once started because I, myself, needed a handful of methods to perform very specific geo related tasks like getting the distance or the direction between two points. Since it was one of the very first libraries on npm back then to do these kind of things in a very simple way, it got a lot of popularity (300k downloads per month as of April 2019!) and as a consequence a lot of contributions over the years. Many of which I just merged as long as they had accompanying tests, without looking at consistency, conventions, complexity, coding style or even the overall quality of the functions that I sometimes didn't even fully understand.

I now cleaned up the codebase completely, rebuilt the entire library "from scratch", unified all the parameters, removed a few functions where I wasn't sure if they should be in here (feel free to add them back of you're using them!) or if they were even used (did a few searches on GitHub for the function names, turned out there are zero results).

Elevation support was dropped, as well as a few functions that unnecessarily made the library really large in size (e.g. isPointInsideRobust alone was over 700[!] lines of code). I removed Grunt from the build process, added "modern" tools like ESLint and Prettier. I switched from Travis CI to Circle CI and I am in the process of further automate the release process of new versions using `semantic-release` and `conventional-commits`. I also switched from pure JavaScript from TypeScript because I think it does have some benefits.

-   All functions are pure function now. No input data is mutated anymore. You give the same input, you get the same output. No side effects or whatsoever.
-   I changed the default `getDistance` function from being the slow, accurate one to being the fast, slightly inaccurate one. The old `getDistance` function is now named `getPreciseDistance` while the old `getDistanceSimple` function is now the default `getDistance` function. You can, however, pass `getPreciseDistance` as parameter to any function that uses distance calculation internally.
-   Artificial limitation to 8 decimal places in decimal coordinates was removed
-   `getBoundsOfDistance()` now returns the _exact_ coordinates due to the removal of the artificial 8 decimal place limitation
-   `getCompassDirection()` does no longer return an object with an _exact_ and a _rough_ direction but only the exact direction as string
-   3rd parameter to `getCompassDirection()` is no longer a string ("circle", "line") but a function to determine the bearing (you can pass `getRhumbLineBearing` or `getGreatCircleBearing`). The function receives the origin and the destination as 1st and 2nd parameter. If no 3rd parameter was given, `getRhumbLineBearing(origin, dest)` is used by default.
-   There is now a new helper function `roughCompassDirection(exact)` if you _really_ only need a very rough (and potentially inaccurate) direction.
-   `orderByDistance()` does no longer modify its input so does not add a `distance` and `key` property to the returned coordinates
-   The result of `getSpeed()` is now always returned as **meters per second**. It can be converted using the new convenience function `convertSpeed(mps, targetUnit)`
-   The point (or distance) is no consistently the first parameter for each functions using either of them (it wasn't before, how confusing is that?)
-   `findNearest()` does not take `offset` and `limit` parameters. It's only a convenience method to get the single one nearest point from a set of coordinates. If you need more than one, have a look at the implementation and implement your own logic using `orderByDistance`
-   Whereever distances are involved, they are returned as meters or meters per second. No more defaulting to kilometers or kilometers per hour.
-   The method how sexagesimal is formatted differs a little bit. It may now potentially return ugly float point units like `52° 46' 21.0004"` in rare cases but it is also more accurate then it was before.
-   Dropped support for Meteor (feel free to add it back if you like)

## Method status in 3.0.0 compared to 2.x.x

-   ❗ `getKeys` renamed to `getCoordinateKeys`
-   ❗ `validate` renamed to `isValidCoordinate`
-   ❗ `getLat` renamed to `getLatitude`
-   ❗ `getLon` renamed to `getLongitude`
-   🗑 `latitude` -> removed
-   🗑 `longitude` -> removed
-   🗑 `getElev` -> removed
-   🗑 `elevation` -> removed
-   🗑 `coords` -> removed (might be re-added as getCoordinate or getNormalizedCoordinate)
-   🗑 `ll` -> removed (because wtfsrsly?)
-   ❗ `getDistance` renamed to `getPreciseDistance`
-   ❗ `getDistanceSimple` renamed to `getDistance`
-   ✅ `getCenter`
-   ✅ `getBounds`
-   ✅ `getCenterOfBounds`
-   ✅ `getBoundsOfDistance`
-   ❗ `isPointInside` renamed to isPointInPolygon
-   🗑 `preparePolygonForIsPointInsideOptimized` -> removed due to missing documentation
-   🗑 `isPointInsideWithPreparedPolygon` -> removed due to missing documentation
-   🗑 `isInside` alias -> removed (too ambiguous)
-   ❗ `isPointInCircle` renamed to isPointWithinRadius
-   🗑 `withinRadius` -> removed
-   ✅ `getRhumbLineBearing`
-   ❗ `getBearing` renamed to `getGreatCircleBearing` for more clarity
-   ✅ `getCompassDirection`
-   🗑 `getDirection` alias -> removed (unnecessry clutter)
-   ✅ `orderByDistance`
-   ✅ `isPointInLine`
-   ❗ getDistanceFromLine -> untested
-   ‼ isPointNearLine -> still missing
-   ✅ `getPathLength`
-   ✅ `getSpeed`
-   ✅ `computeDestinationPoint`
-   ‼ convertUnit -> still missing (will be remamed to convertDistance because too ambiguous)
-   ❗ `useDecimal` renamed to `toDecimal`
-   ❗ `decimal2sexagesimal` renamed to `decimalToSexagesimal`
-   ❗ `sexagesimal2decimal` renamed to `sexagesimalToDecimal`
-   ✅ `isDecimal`
-   ✅ `isSexagesimal`
-   🆕 Added new method `getCoordinateKey` to get a property name (e.g. `lat` or `lng` of an object based on an array of possible names)
