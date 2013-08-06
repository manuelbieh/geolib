	/* Optional elevation addon requires Googlemaps API JS */

	/*global google:true geolib:true require:true module:true elevationResult*/
	/**
	*  @param      Array Collection of coords [{latitude: 51.510, longitude: 7.1321}, {latitude: 49.1238, longitude: "8° 30' W"}, ...]
	*
	*  @return     Array [{lat:#lat, lng:#lng, elev:#elev},....]}
	*/
	geolib.getElevation = function() {
		if (typeof window.navigator !== 'undefined') {
			geolib.getElevationClient.apply(this, arguments);
		} else {
			geolib.getElevationServer.apply(this, arguments);
		}
	};

	geolib.getElevationClient = function(coords, cb) {

		if (!window.google) {
			throw new Error("Google maps api not loaded");
		}

		if (coords.length === 0) {
			return cb(null, null);
		}

		if (coords.length === 1) {
			return cb(new Error("getElevation requires at least 2 points."));
		}

		var path  = [];
		var keys = geolib.getKeys(coords[0]);
		var latitude = keys.latitude;
		var longitude = keys.longitude;

		for(var i = 0; i < coords.length; i++) {
			path.push(new google.maps.LatLng(
				geolib.useDecimal(coords[i][latitude]),
				geolib.useDecimal(coords[i][longitude])
			));
		}

		var positionalRequest = {
			'path': path,
			'samples': path.length
		};
		var elevationService = new google.maps.ElevationService();
		elevationService.getElevationAlongPath(positionalRequest,function (results, status) {
			geolib.elevationHandler(results, status, coords, keys, cb);
		});

	};

	geolib.getElevationServer = function(coords, cb) {

		if (coords.length === 0) {
			return cb(null, null);
		}

		if (coords.length === 1) {
			return cb(new Error("getElevation requires at least 2 points."));
		}

		var gm = require('googlemaps');
		var path  = [];
		var keys = geolib.getKeys(coords[0]);
		//coords[0]
		var latitude = keys.latitude;
		var longitude = keys.longitude;

		for(var i = 0; i < coords.length; i++) {
			path.push(geolib.useDecimal(coords[i][latitude]) + ',' +
			  geolib.useDecimal(coords[i][longitude]));
		}

		gm.elevationFromPath(path.join('|'), path.length, function(err, results) {
			geolib.elevationHandler(results.results, results.status, coords, keys, cb);
		});

	},

	geolib.elevationHandler = function(results, status, coords, keys, cb){
		var latsLngsElevs = [];
		var latitude = keys.latitude;
		var longitude = keys.longitude;
		if (status == "OK" ) {
			for (var i = 0; i < results.length; i++) {
				latsLngsElevs.push({
					"lat":coords[i][latitude],
					"lng":coords[i][longitude],
					"elev":results[i].elevation
				});
			}
			cb(null, latsLngsElevs);
		} else {
			cb(new Error("Could not get elevation using Google's API"), elevationResult.status);
		}
	};

	/**
	*  @param      Array [{lat:#lat, lng:#lng, elev:#elev},....]}
	*
	*  @return     Number % grade
	*/
	geolib.getGrade = function(coords){
		var keys = geolib.getKeys(coords[0]);
		var elevation = keys.elevation;
		var rise = Math.abs(coords[coords.length-1][elevation] - coords[0][elevation]);
		var run = geolib.getPathLength(coords);
		return Math.floor((rise/run)*100);
	};

	/**
	*  @param      Array [{lat:#lat, lng:#lng, elev:#elev},....]}
	*
	*  @return     Object {gain:#gain, loss:#loss}
	*/
	geolib.getTotalElevationGainAndLoss = function(coords){
		var keys = geolib.getKeys(coords[0]);
		var elevation = keys.elevation;
		var gain = 0;
		var loss = 0;
		for(var i = 0; i < coords.length - 1; i++){
			var deltaElev = coords[i][elevation] - coords[i + 1][elevation];
			if (deltaElev > 0) {
				loss += deltaElev;
			} else {
				gain += Math.abs(deltaElev);
			}
		}
		return {
			"gain": gain,
			"loss": loss
		};
	};
