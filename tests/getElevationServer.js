var util = require('util')
  , http = require('http')
  , geolib = require('geolib');

describe('Geolib', function() {
  describe('getElevationServer', function() {
    it('should getElevation for three points', function(done) {
      var coords = [
        {"lat":40.79162,"lng":-111.76560999999998},
        {"lat":40.79938945887229,"lng":-111.76680525603354},
        {"lat":40.80354,"lng":-111.77384999999998}
      ];
      geolib.getElevation(coords, function (err, result){
        if (err){
          throw new Error("Could not getelevation");
        } else {
          Math.floor(results[0].elev).should.be.equal(2211);
          Math.floor(results[1].elev).should.be.equal(1995);
          Math.floor(results[2].elev).should.be.equal(1978);
        }
      });
    });
  });
});
