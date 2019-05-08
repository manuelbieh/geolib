# Breaking Changes in 3.0.0

-   removed artificial limitation to 8 decimal places in decimal coordinates
-   `sexagesimal2decimal` was renamed to `sexagesimalToDecimal`
-   `getCenter()` is not returning the distance in addition to the center anymore
-   `getBoundsOfDistance()` now returns the _exact_ points due to the removal of the artificial 8 decimal place limitation
