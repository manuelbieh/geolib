# Breaking Changes in 3.0.0

-   All functions are pure function now. No input data is mutated anymore. You give the same input, you get the same output. No side effects or whatsoever.
-   Artificial limitation to 8 decimal places in decimal coordinates was removed
    <!-- -   `sexagesimal2decimal` was renamed to `sexagesimalToDecimal` -->
-   `getBoundsOfDistance()` now returns the _exact_ coordinates due to the removal of the artificial 8 decimal place limitation
-   `getCompassDirection()` does no longer return an object with an _exact_ and a _rough_ direction but only the exact direction as string
-   3rd parameter to `getCompassDirection()` is no longer a string ("circle", "line") but a function to determine the bearing (you can pass `getRhumbLineBearing` or `getGreatCircleBearing`). The function receives the origin and the destination as 1st and 2nd parameter. If no 3rd parameter was given, `getRhumbLineBearing(origin, dest)` is used by default.
-   There is now a new helper function `roughCompassDirection(exact)` if you _really_ only need a very rough (and potentially inaccurate) direction.
-   `orderByDistance()` does no longer modify its input so does not add a `distance` and `key` property to the returned coordinates
-   The result of `getSpeed()` is now always returned as meters per second. It can be converted using the new convenience function `convertSpeed(mps, targetUnit)`
-   The point (or distance) is no consistently the first parameter for each functions using either of them (it wasn't before, how confusing is that?)
-   `findNearest()` does not take `offset` and `limit` parameters. It's only a convenience method to get the single one nearest point from a set of coordinates. If you need more than one, have a look at the implementation and implement your own logic using `orderByDistance`
-   Whereever distances are involved, they are returned as meters or meters per second. No more defaulting to kilometers or kilometers per hour.
-   The method how sexagesimal is formatted differs a little bit. It may now potentially return ugly float point units like `52° 46' 21.0004"` in rare cases but it is also more accurate then it was before.

## Method status in 3.0.0

-   ❗ getKeys -> getCoordinateKeys
-   ❗ validate -> isValidCoordinate
-   ❗ getLat -> getLatitude (might be re-added for convenience)
-   ❗ getLon -> getLongitude (might be re-added for convenience)
-   ‼ latitude -> removed
-   ‼ longitude -> removed
-   ‼ getElev -> removed (might be re-added)
-   ‼ elevation -> removed
-   ‼ coords -> removed (might be re-added as getCoordinate or getNormalizedCoordinate)
-   ‼ ll -> removed (bccause wtfsrsly?)
-   ❗ getDistance -> getPreciseDistance
-   ❗ getDistanceSimple -> getDistance
-   ✅ getCenter
-   ✅ getBounds
-   ✅ getCenterOfBounds
-   ✅ getBoundsOfDistance (missing tests)
-   ❗ isPointInside -> isPointInPolygon
-   ‼ preparePolygonForIsPointInsideOptimized -> still missing
-   ‼ isPointInsideWithPreparedPolygon -> still missing
-   ‼ isInside -> removed (too ambiguous)
-   ❗ isPointInCircle -> isPointWithinRadius
-   ‼ withinRadius -> removed
-   ✅ getRhumbLineBearing
-   ❗ getBearing -> getGreatCircleBearing
-   ✅ getCompassDirection
-   ‼ getDirection -> removed (might be added back)
-   ✅ orderByDistance
-   ✅ isPointInLine
-   ❗ getDistanceFromLine -> untested
-   ‼ isPointNearLine -> still missing
-   ✅ getPathLength
-   ✅ getSpeed
-   ✅ computeDestinationPoint
-   ‼ convertUnit -> still missing (will be remamed to convertDistance because too ambiguous)
-   ❗ useDecimal -> toDecimal
-   ❗ decimal2sexagesimal -> decimalToSexagesimal
-   ❗ sexagesimal2decimal -> sexagesimalToDecimal
-   ✅ isDecimal
-   ✅ isSexagesimal
-
