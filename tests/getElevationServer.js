/*global require:true describe:true it:true*/
var util = require('util'), http = require('http'), geolib = require('../geolib');

describe('Geolib', function() {
  describe('getElevationServer', function() {
    it('should getElevation for three points', function(done) {
      var coords = [
        {"lat":40.79162,"lng":-111.76560999999998},
        {"lat":40.79938945887229,"lng":-111.76680525603354},
        {"lat":40.80354,"lng":-111.77384999999998}
      ];
      geolib.getElevation(coords, function (err, results){
        if (err){
          throw new Error("Could not get elevation");
        } else {
          if (Math.floor(results[0].elev) !== 2211 ||
              Math.floor(results[1].elev) !== 2011 ||
              Math.floor(results[2].elev) !== 1978) {
            throw new Error("wrong elevation results: " + JSON.stringify(results));
          }
        }
        done();
      });
    });
  });
});
