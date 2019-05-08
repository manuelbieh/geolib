# Breaking Changes in 3.0.0

-   removed artificial limitation to 8 decimal places in decimal coordinates
-   `sexagesimal2decimal` was renamed to `sexagesimalToDecimal`
-   `getCenter()` is not returning the distance in addition to the center anymore
-   `getBoundsOfDistance()` now returns the _exact_ points due to the removal of the artificial 8 decimal place limitation
-   `getCompassDirection()` does no longer return an object with an _exact_ and a _rough_ direction as object but only the exact direction as string
-   3rd parameter to `getCompassDirection()` is no longer a string ("circle", "line") but a function to determine the bearing (you can pass `getRhumbLineBearing` or `getGreatCircleBearing`). The function receives the origin and the destination as 1st and 2nd parameter. If no 3rd parameter was given, `getRhumbLineBearing(origin, dest)` is used by default.
-   There is now a new helper function `roughCompassDirection(exact)` if you _really_ only need a very rough (and potentially inaccurate) direction.
