## [3.3.14](https://github.com/manuelbieh/geolib/compare/v3.3.13...v3.3.14) (2026-04-03)

### Fixes

* add trailing slash to publishConfig registry URL ([4bcfb69](https://github.com/manuelbieh/geolib/commit/4bcfb699c369db756b4cae02f73f845d1ecf489c))

### Improvements

* remove CircleCI config ([15ab897](https://github.com/manuelbieh/geolib/commit/15ab897527776dcf35b1309ce5e32864ef1cc8db))
* remove registry-url from setup-node in publish job ([e875621](https://github.com/manuelbieh/geolib/commit/e875621ca312869fa3a80d1de0e94a2e638ea2f0))
* remove unused @semantic-release/exec dependency ([6824bbc](https://github.com/manuelbieh/geolib/commit/6824bbc91f381b4c1d18a5dce4f8509cd015116c))
* update all dependencies to latest versions ([9a96de1](https://github.com/manuelbieh/geolib/commit/9a96de1e5ab30fb8a825e3125b7aa70871020317))
* upgrade to @semantic-release/npm@13 for native OIDC support ([f57b816](https://github.com/manuelbieh/geolib/commit/f57b8168b867c0a1a08ef051391b6f6e2803d6c0))

## [3.3.13](https://github.com/manuelbieh/geolib/compare/v3.3.12...v3.3.13) (2026-04-03)

### Improvements

* add publishConfig for npm OIDC registry matching ([081f104](https://github.com/manuelbieh/geolib/commit/081f1047d01642c4df129205ce8e163ed2dd3f68))

## [3.3.12](https://github.com/manuelbieh/geolib/compare/v3.3.11...v3.3.12) (2026-04-03)

### Improvements

* remove --registry flag from npm publish ([2c4481d](https://github.com/manuelbieh/geolib/commit/2c4481d35aead064d1fb8c2cfcca939d7ba2ce62))

## [3.3.11](https://github.com/manuelbieh/geolib/compare/v3.3.10...v3.3.11) (2026-04-03)

### Improvements

* trigger release after npm 2fa fix ([72e3d4e](https://github.com/manuelbieh/geolib/commit/72e3d4e1cbb057706c5f40232b481a2cbeacc03a))

## [3.3.10](https://github.com/manuelbieh/geolib/compare/v3.3.9...v3.3.10) (2026-04-03)

### Improvements

* test npm OIDC publish after 2fa setting change ([3a554a7](https://github.com/manuelbieh/geolib/commit/3a554a7465415a9678659af9e9e43ac46d190f58))

## [3.3.9](https://github.com/manuelbieh/geolib/compare/v3.3.8...v3.3.9) (2026-04-03)

### Improvements

* add packages:write permission for npm OIDC publish ([37e547f](https://github.com/manuelbieh/geolib/commit/37e547f731dfb7a7243e262a867262fa4b61088c))

## [3.3.8](https://github.com/manuelbieh/geolib/compare/v3.3.7...v3.3.8) (2026-04-02)

### Improvements

* trigger release ([c56002e](https://github.com/manuelbieh/geolib/commit/c56002e6d8fe5c44a513782a6199d9a41dfa578b))

## [3.3.7](https://github.com/manuelbieh/geolib/compare/v3.3.6...v3.3.7) (2026-04-02)

### Improvements

* add package description ([bcb76a9](https://github.com/manuelbieh/geolib/commit/bcb76a9201cc86dc717f1b0312408c4ca8d19df3))

## [3.3.6](https://github.com/manuelbieh/geolib/compare/v3.3.5...v3.3.6) (2026-04-02)

### Improvements

* optimize getDistance ([e6ef543](https://github.com/manuelbieh/geolib/commit/e6ef54359e5fe828833e0ff022679f6e8cc51e79))

## [3.3.5](https://github.com/manuelbieh/geolib/compare/v3.3.4...v3.3.5) (2026-04-02)

### Fixes

* getDistanceFormLine returning NaN when point on line or line is a point ([e1817d9](https://github.com/manuelbieh/geolib/commit/e1817d9e57756f741aaea4e00be94f227a99a718))

### Improvements

* improve code consistency and maintainability ([c2d199f](https://github.com/manuelbieh/geolib/commit/c2d199fe11c83d9407f45f1bc462f94fe0e6e296))
* upgrade all devDependencies to latest versions ([05e84b9](https://github.com/manuelbieh/geolib/commit/05e84b91514772be78045853508095f5bd3fede8))

### [3.3.4](https://github.com/manuelbieh/geolib/compare/v3.3.3...v3.3.4) (2023-06-01)


### 🔧 Fixes

* getRoughCompassDirection regex used "contains" logic rather than exact matching resulting incorrect results ([955937b](https://github.com/manuelbieh/geolib/commit/955937b6a0ec53a9ced3667c923ab413a31eb8c6))
* isPointWithinRadius false even if true ([249d047](https://github.com/manuelbieh/geolib/commit/249d047e238df95d8a62189d5c3245120bc4421d))

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
