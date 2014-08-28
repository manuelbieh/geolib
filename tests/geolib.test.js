/*global test:true expect:true geolib:true equal:true asyncTest:true start:true ok:true*/

	var cities = {
		"Berlin": {latitude: 52.518611, longitude: 13.408056},
		"Boston": {latitude: 42.357778, longitude: "71° 3' 34\" W"},
		"Dortmund": {latitude: "51° 31' 10.11\" N", longitude: "7° 28' 01\" E"},
		"London": {latitude: "51° 31' N", longitude: "0° 7' W"},
		"Manchester": {latitude: "53° 29' N", longitude: "2° 14' W"},
		"New York City": {latitude: 40.715517, longitude: -73.9991},
		"San Francisco": {latitude: 37.774514, longitude: -122.418079},
    "Sydney": {latitude: -33.869085, longitude: 151.210046},
		"Moscow": {latitude: 55.751667, longitude: 37.617778}
	};

	var polygon = [{"latitude": 51.513357512, "longitude": 7.45574331},
		{"latitude": 51.515400598, "longitude": 7.45518541},
		{"latitude": 51.516241842, "longitude": 7.456494328},
		{"latitude": 51.516722545, "longitude": 7.459863183},
		{"latitude": 51.517443592, "longitude": 7.463232037},
		{"latitude": 51.5177507, "longitude": 7.464755532},
		{"latitude": 51.517657233, "longitude": 7.466622349},
		{"latitude": 51.51722995, "longitude": 7.468317505},
		{"latitude": 51.516816015, "longitude": 7.47011995},
		{"latitude": 51.516308606, "longitude": 7.471793648},
		{"latitude": 51.515974782, "longitude": 7.472437378},
		{"latitude": 51.515413951, "longitude": 7.472845074},
		{"latitude": 51.514559338, "longitude": 7.472909447},
		{"latitude": 51.512195717, "longitude": 7.472651955},
		{"latitude": 51.511127373, "longitude": 7.47140741},
		{"latitude": 51.51029939, "longitude": 7.469948288},
		{"latitude": 51.509831973, "longitude": 7.468446251},
		{"latitude": 51.509978876, "longitude": 7.462481019},
		{"latitude": 51.510913701, "longitude": 7.460678574},
		{"latitude": 51.511594777, "longitude": 7.459434029},
		{"latitude": 51.512396029, "longitude": 7.457695958},
		{"latitude": 51.513317451, "longitude": 7.45574331}
	];

	var polygon2 = [
		{"latitude": 51.513357512, "longitude": 7.45574331, "elevation":523.92},
		{"latitude": 51.515400598, "longitude": 7.45518541, "elevation":524.54},
		{"latitude": 51.516241842, "longitude": 7.456494328, "elevation":523.12},
		{"latitude": 51.516722545, "longitude": 7.459863183, "elevation":522.77},
		{"latitude": 51.517443592, "longitude": 7.463232037, "elevation":521.12}
	];


	function nearlyEqual(result, expected, epsilon) {
		var diff = Math.abs(expected - result);
		ok(diff < epsilon,
		   'Expected ' + expected + ', got ' + result + ', diff= ' + diff +
		   ' (max diff=' + epsilon + ')');
	}

	test("Testing distance calculation: getDistance()", function() {

		expect(5);

		var distance1 = geolib.getDistance({latitude: 52.518611, longitude: 13.408056}, {latitude: 51.519475, longitude: 7.46694444});
		var distance2 = geolib.getDistance({latitude: 52.518611, longitude: 13.408056}, {latitude: 51.519475, longitude: 7.46694444}, 100);
		var distance3 = geolib.getDistance({latitude: 37.774514, longitude: -122.418079}, {latitude: 51.519475, longitude: 7.46694444});
		var distance4 = geolib.getDistance({"lat": 41.72977, "lng":-111.77621999999997}, {"lat":41.73198,"lng":-111.77636999999999});
		var geoJSON = geolib.getDistance([-111.77621999999997, 41.72977], [-111.77636999999999, 41.73198]);

		equal(distance1, 422592, "Distance 1 should be 422592" );
		equal(distance2, 422600, "Distance 2 should be 422600" );
		equal(distance3, 8980260, "Distance 3 should be 8980260" );
		equal(distance4, 246, "Distance 4 should be 246" );
		equal(geoJSON, 246, "Testing getDistance() with geoJSON data");

	});

	test("Testing distance calculation: getDistanceSimple()", function() {

		expect(3);

		var distance1 = geolib.getDistanceSimple({latitude: 52.518611, longitude: 13.408056}, {latitude: 51.519475, longitude: 7.46694444});
		var distance2 = geolib.getDistanceSimple({latitude: 52.518611, longitude: 13.408056}, {latitude: 51.519475, longitude: 7.46694444}, 100);
		var distance3 = geolib.getDistanceSimple({latitude: 37.774514, longitude: -122.418079}, {latitude: 51.519475, longitude: 7.46694444});

		equal(distance1, 421786, "Distance 1 should be 421786" );
		equal(distance2, 421800, "Distance 2 should be 421800" );
		equal(distance3, 8967172, "Distance 3 should be 8967172" );

	});

	test("Testing center calculation: getCenter()", function() {
		expect(4);

		var europe = geolib.getCenter([cities["Berlin"], cities["Moscow"]]);
		var pacific = geolib.getCenter([cities["Sydney"], cities["San Francisco"]]);

    equal(europe.latitude, 54.743683, "Center of Berlin and Moscow should be near Minsk (latitude should be 54.743683)" );
    equal(europe.longitude, 25.033239, "Center of Berlin and Moscow should be near Minsk (longitude should be 25.033239)" );
    equal(pacific.latitude, 2.676493, "Center of Sydney and San-Francisco should be in the Pacific (latitude should be 2.676493)" );
    equal(pacific.longitude, -166.927225, "Center of Sydney and San-Francisco should be in the Pacific (longitude should be -166.927225)" );
	});

	test("Testing bounding box: getBounds()", function() {
		expect(12);

		var box = geolib.getBounds(polygon);

		equal(box.maxLat, 51.5177507, "maxLat should be 51.5177507");
		equal(box.minLat, 51.509831973, "minLat should be 51.509831973");
		equal(box.maxLng, 7.472909447, "maxLng should be 7.472909447");
		equal(box.minLng, 7.45518541, "minLng should be 7.45518541");
		equal(typeof box.minElev, "undefined", "minElev should be undefind");
		equal(typeof box.maxElev, "undefined", "maxElev should be undefind");

		box = geolib.getBounds(polygon2);

		equal(box.maxLat, 51.517443592, "maxLat should be 51.517443592");
		equal(box.minLat, 51.513357512, "minLat should be 51.513357512");
		equal(box.maxLng, 7.463232037, "maxLng should be 7.463232037");
		equal(box.minLng, 7.45518541, "minLng should be 7.45518541");
		equal(box.maxElev, 524.54, "maxElev should be 524.54");
		equal(box.minElev, 521.12, "minElev should be 521.12");
  });

	test("Testing bounding box: getBoundsDistance()", function() {
		expect(6);
		var point = {latitude: 34.090166, longitude: -118.276736555556};
		var bounds = geolib.getBoundsOfDistance(point, 1000);
		ok(bounds[0].latitude < bounds[1].latitude);
		ok(bounds[0].longitude < bounds[1].longitude);
		var north = {latitude: bounds[1].latitude, longitude: point.longitude};
		var south = {latitude: bounds[0].latitude, longitude: point.longitude};
		var east = {latitude: point.latitude, longitude: bounds[1].longitude};
		var west = {latitude: point.latitude, longitude: bounds[0].longitude};
		nearlyEqual(geolib.getDistance(point, north), 1000, 10);
		nearlyEqual(geolib.getDistance(point, south), 1000, 10);
		nearlyEqual(geolib.getDistance(point, east), 1000, 10);
		nearlyEqual(geolib.getDistance(point, west), 1000, 10);
	});

	asyncTest("Testing elevation: getElevation()", function() {
		expect(4);

    var latsLngsElevs;
    var coords1 = [{"lat":33.76346,"lng":-84.43430000000001},
                  {"lat":33.76418,"lng":-84.42999999999995}];
    var coords2 = [{"lat":41.73549,"lng":-111.85842000000002},
                  {"lat":41.73600999999999,"lng":-111.85572000000002}];

    var doneCount = 0;
    var done = function (){
      ++doneCount;
      if (doneCount === 2) {
        start();
      }
    };

    geolib.getElevation(coords1,function(err, results){
      if (err) {
        throw err;
      }
      latsLngsElevs = results;
      equal(latsLngsElevs[0].elev, 299.4249877929688, "1st elev should be 299.4249877929688");
      equal(latsLngsElevs[1].elev, 280.3750305175781, "2nd elev should be 280.3750305175781");
      done();
    });

    geolib.getElevation(coords2,function(err, results){
      if (err) {
        throw err;
      }
      latsLngsElevs = results;
      equal(latsLngsElevs[0].elev, 1358.223999023438, "1st elev should be 1358.223999023438");
      equal(latsLngsElevs[1].elev, 1360.70654296875, "2nd elev should be 1360.70654296875");
      done();
    });

  });

	test("Testing grade: getGrade()", function() {
		expect(2);
    var coords1 = [{"lat":41.72977,"lng":-111.77621999999997,"elev":1702.72412109375},
                    {"lat":41.73198,"lng":-111.77636999999999,"elev":1849.7333984375}];
    var coords2 = [{"lat":40.75402,"lng":-111.75475,"elev":2209.137451171875},
                  {"lat":40.76481,"lng":-111.76778999999999,"elev":1660.49609375}];

    var grade = geolib.getGrade(coords1);
		equal(grade, 51, "grade should be 51");

    grade = geolib.getGrade(coords2);
		equal(grade, 31, "grade should be 31");
  });

	test("Testing elevation gain and loss: getTotalElevationGainAndLoss()", function() {

		expect(4);
		var coords1 = [{"lat":41.72975,"lng":-111.77580999999998,"elev":1707.123046875},
						{"lat":41.73298475750587,"lng":-111.77603699785413,"elev":1922.056396484375},
						{"lat":41.73517,"lng":-111.77881000000002,"elev":1893.9931640625}];
		var coords2 = [{"lat":40.79162,"lng":-111.76560999999998,"elev":2211.202880859375},
						{"lat":40.79938945887229,"lng":-111.76680525603354,"elev":1995.89990234375},
						{"lat":40.80354,"lng":-111.77384999999998,"elev":1978.573120117188}];

		var gainAndLoss = geolib.getTotalElevationGainAndLoss(coords1);
			equal(gainAndLoss.gain, 214.933349609375, "gain should be 214.933349609375");
			equal(gainAndLoss.loss, 28.063232421875, "loss should be 28.063232421875");

		gainAndLoss = geolib.getTotalElevationGainAndLoss(coords2);
			equal(gainAndLoss.gain, 0, "gain should be 0");
			equal(gainAndLoss.loss, 232.62976074218705, "loss should be 232.62976074218705");

	});

	test("Testing conversion: sexagesimal2decimal()", function() {

		expect(8);

		var dec1 = geolib.useDecimal("51° 31' 10.11\" N");
		var dec2 = geolib.useDecimal("7° 28' 01\" E");
		var dec3 = geolib.useDecimal("19°    22'   32\"      S");
		var dec4 = geolib.useDecimal("71° 3'     34\" W");
		var dec5 = geolib.useDecimal("71°3'W");
		var dec6 = geolib.useDecimal("51.519470");
		var dec7 = geolib.useDecimal("-122.418079");
		var dec8 = geolib.useDecimal("51° 31.52' 10.11\" N");
		
		equal(dec1, 51.519475, "Decimal value should be 51.519475" );
		equal(dec2, 7.46694444, "Decimal value should be 7.46694444" );
		equal(dec3, -19.37555556, "Decimal value should be -19.37555556" );
		equal(dec4, -71.05944444, "Decimal value should be -71.05944444" );
		equal(dec5, -71.05, "Decimal value should be -71.05" );
		equal(dec6, 51.51947, "Decimal value should be 51.51947" );
		equal(dec7, -122.418079, "Decimal value should be -122.418079" );
		equal(dec8, 51.52814167, "Decimal value should be 51.52814167");
	});

	test("Testing different useDecimal() formats", function() {

		expect(8);

		var latToCheck = "51° 31.52'";
		var latExpected = 51.52533333;
		var lngToCheck = "7° 28' 01\"";
		var lngExpected = 7.46694444;

		var dec1 = geolib.useDecimal(latToCheck);
		var dec2 = geolib.useDecimal(latExpected);
		var dec3 = geolib.useDecimal({lat: latToCheck, lng: lngToCheck});
		var dec4 = geolib.useDecimal([{lat: latToCheck, lng: lngToCheck}, {lat: latToCheck, lng: lngToCheck}]);
		var dec5 = geolib.useDecimal([latToCheck, lngToCheck]);
		var dec6 = geolib.useDecimal({example: {lat: latToCheck, lng: lngToCheck}});

		equal(dec1, latExpected, "Sexagesimal conversion of " + latToCheck);
		equal(dec2, latExpected, "Conversion of " + latExpected);
		equal(dec3.latitude, latExpected, "Sexagesimal conversion of object with lat property");
		equal(dec3.longitude, lngExpected, "Sexagesimal conversion of object with lng property");
		equal(dec4.length, 2, "Conversion of array with latlng objects returns array");
		equal(typeof dec4[0], "object", "... objects are still objects");
		equal(dec4[1].latitude, latExpected, "Array[1].latitude is converted");
		//equal(dec5[0], {lat: latExpected}, "Conversion of array returns array of decimals");
		//deepEqual(dec5[0], {"lat": 51.52533333}, "Conversion of array returns array of decimals");
		deepEqual(dec5, [51.52533333, 7.46694444], "Conversion of array returns array of decimals");
		
		

	});

	test("Testing conversion: decimal2sexagesimal()", function() {

		expect(2);
		var sexa1 = geolib.decimal2sexagesimal(51.519475);
		var sexa2 = geolib.decimal2sexagesimal(-19.37555556);

		equal(sexa1, '51° 31\' 10.11"', "Decimal value should be 51° 31' 10.11\"" );
		equal(sexa2, '19° 22\' 32.00"', "Decimal value should be 19° 22' 32\" S" );

	});

	test("Testing: getCompassDirection()", function() {

		expect(2);
		var dir1 = geolib.getCompassDirection({latitude: 52.518611, longitude: 13.408056}, {latitude: 51.519475, longitude: 7.46694444});

		equal(dir1.rough, 'W', 'Should be west');
		equal(dir1.exact, 'WSW', 'Should be west-south-west');

	});


	test("Testing: findNearest()", function() {

		expect(4);
		var near1 = geolib.findNearest({latitude: 36.1168, longitude: -115.173798}, cities);

		equal(near1.key, 'San Francisco', 'Nearest city to Las Vegas from predefined set should be San Francisco');
		equal(near1.distance, 670788, 'Distance should be 670788');
		equal(near1.latitude, 37.774514, 'Latitude should be 37.774514');
		equal(near1.longitude, -122.418079, 'Latitude should be -122.418079');

	});

	test("Testing: getPathLength()", function() {

		var pathLength = geolib.getPathLength(polygon);
		equal(pathLength, 3377, 'Path length should be 3377');

	});

	test("Testing: getSpeed()", function() {
		var speedInKMH = geolib.getSpeed({lat: 51.567294, lng: 7.38896, time: 1360231200880}, {lat: 52.54944, lng: 13.468509, time: 1360245600880});
		var speedInMPH = geolib.getSpeed({lat: 51.567294, lng: 7.38896, time: 1360231200880}, {lat: 52.54944, lng: 13.468509, time: 1360245600880}, {unit: 'mi'});
		equal(speedInKMH, 107.7308, '430.923 km in 4 hours should equal 107.7308 kmh');
		equal(speedInMPH, 66.9408, '430.923 km in 4 hours should equal 66.9408 mph');
	});

	test("Testing: isPointInside()", function() {

		var isInside1 = geolib.isPointInside({latitude: 51.514252208, longitude: 7.464905736}, polygon); // Point is inside of the polygon
		var isInside2 = geolib.isPointInside({latitude: 51.510539773, longitude: 7.454691884}, polygon); // Point is not inside polygon

		ok(isInside1, "Point 1 is inside polygon");
		ok(!isInside2, "Point 2 is not inside polygon");

	});

    test("Testing: isPointInsideWithPreparedPolygon()", function() {
      geolib.preparePolygonForIsPointInsideOptimized(polygon);

      var isInside1 = geolib.isPointInsideWithPreparedPolygon({latitude: 51.514252208, longitude: 7.464905736}, polygon); // Point is inside of the polygon
      var isInside2 = geolib.isPointInsideWithPreparedPolygon({latitude: 51.510539773, longitude: 7.454691884}, polygon); // Point is not inside polygon

      ok(isInside1, "Point 1 is inside polygon");
      ok(!isInside2, "Point 2 is not inside polygon");

    });

	test("Testing: convertUnit()", function() {

		equal(geolib.convertUnit('km', 1000), 1, 'Conversion of 1000 m to km');
		equal(geolib.convertUnit('m', 1000), 1000, 'Conversion of 1000 m to m (just to make sure)');
		equal(geolib.convertUnit('cm', 1000), 100000, 'Conversion of 1000 m to cm');
		equal(geolib.convertUnit('mm', 1000), 1000000, 'Conversion of 1000 m to mm');
		equal(geolib.convertUnit('mi', 1000), 0.6214, 'Conversion of 1000 m to miles');
		equal(geolib.convertUnit('sm', 1000), 0.5399, 'Conversion of 1000 m to seamiles');
		equal(geolib.convertUnit('ft', 1000), 3280.8399, 'Conversion of 1000 m to ft');
		equal(geolib.convertUnit('in', 1000), 39370.0787, 'Conversion of 1000 m to in');
		equal(geolib.convertUnit('yd', 1000), 1093.6133, 'Conversion of 1000 m to  yd');

	});

	test("Testing: isSexagesimal()", function() {

		ok(geolib.isSexagesimal('51° 31\''), '51° 31\'');
		ok(geolib.isSexagesimal('51° 31\' 12"'), '51° 31\' 12"');
		ok(geolib.isSexagesimal('51° 31\' 12.27"'), '51° 31\' 12.27"');
		ok(geolib.isSexagesimal('51° 31\' 12.27" N'), '51° 31\' 12.27" N');
		ok(geolib.isSexagesimal('51° 31.34\' 12.27" N'), '51° 31.34\' 12.27" N');
		ok(geolib.isSexagesimal('51° 31\' N'), '51° 31\' N');

		//ok(geolib.isSexagesimal('51° N'), '51°'); // coming soon

	});
