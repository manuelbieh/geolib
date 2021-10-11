### [3.3.3](https://github.com/manuelbieh/geolib/compare/v3.3.2...v3.3.3) (2021-10-11)


### 🔧 Fixes

* ignore whitespaces in sexagesimal patterns. fixes [#254](https://github.com/manuelbieh/geolib/issues/254) ([47850ea](https://github.com/manuelbieh/geolib/commit/47850eaa1b8dcbd379b70d7af142ccd74760f0cc))
* increase accuracy ([2a7b443](https://github.com/manuelbieh/geolib/commit/2a7b443207fd508cb35e6f57c2c8c2899d012922))
* Merge pull request [#278](https://github.com/manuelbieh/geolib/issues/278) from PaulCapron/patch-1 ([3827a8f](https://github.com/manuelbieh/geolib/commit/3827a8f9acc1bf766c26b19ae0b96a9d3420c4c7))

### [3.3.2](https://github.com/manuelbieh/geolib/compare/v3.3.1...v3.3.2) (2021-10-11)


### 🔧 Fixes

* make native ESM importing from Node.js work ([7a850b7](https://github.com/manuelbieh/geolib/commit/7a850b784df3c342a10289e2c8da564d1297fbf1))

### [3.3.1](https://github.com/manuelbieh/geolib/compare/v3.3.0...v3.3.1) (2020-05-24)


### 🔧 Fixes

* add missing wktToPolygon export to UMD build. fixes [#221](https://github.com/manuelbieh/geolib/issues/221) ([e76848b](https://github.com/manuelbieh/geolib/commit/e76848b1f61bcb85d77ccd31b9cbaa176ffbc5b7))

## [3.3.0](https://github.com/manuelbieh/geolib/compare/v3.2.2...v3.3.0) (2020-05-24)


### 🧩 Features

* re-export constants so they can be used by library consumers ([1a5e214](https://github.com/manuelbieh/geolib/commit/1a5e214b78f15ef9783d0fda5c22c97c39c71a13))


### 💉 Improvements

* update all deps and make release workflow work with external config ([2cf5513](https://github.com/manuelbieh/geolib/commit/2cf5513992ba431414212596d6858cf6765cf8c5))
* update node image during ci ([17c821f](https://github.com/manuelbieh/geolib/commit/17c821f0104f75af1e37d90bd92e7eee2065fb71))
* use external release-config to publish new releases with automated CHANGELOG.md ([81b4bce](https://github.com/manuelbieh/geolib/commit/81b4bce833abea83fecd538126c348f27eee1810))

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
