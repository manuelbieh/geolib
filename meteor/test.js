'use strict';

Tinytest.add('Geolib.is', function (test) {
  test.equal(geolib.radius, 6378137, {message: 'simple geolib object'});
});
