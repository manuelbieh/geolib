/**
* A small library to provide some basic geo functions like distance calculation,
* conversion of decimal coordinates to sexagesimal and vice versa, etc.
* WGS 84 (World Geodetic System 1984)
* 
* @author Manuel Bieh
* @url http://www.manuelbieh.com/
* @version 1.1.8
* @license LGPL 
**/

(function (window, undefined) {

	var radius = 6378137; // Earth radius
	var sexagesimalPattern = /^([0-9]{1,3})°\s*([0-9]{1,3})'\s*(([0-9]{1,3}(\.([0-9]{1,2}))?)"\s*)?([NEOSW]?)$/;
	var googleClientId;
	var googlePrivateKey;
	if (typeof window.navigator === 'undefined') {
    var gm = require('googlemaps');
  }

	var geolib = {

		decimal: {},

		sexagesimal: {},

		distance: 0,

		/**
		* Get the key names for a geo point.
		*
		* @param	object	Point position {latitude: 123, longitude: 123, elevation: 123}
		* @return	object	{
		*						longitude: 'lng|long|longitude',
		*						latitude: 'lat|latitude',
		*						elevation: 'alt|altitude|elev|elevation' 
		*					}
		*/
		getKeys: function(point) {
			var latitude = point.hasOwnProperty('lat') ? 'lat' : 'latitude';
			var longitude = (point.hasOwnProperty('lng') ? 'lng' : false) ||
											(point.hasOwnProperty('long') ? 'long' : false) ||
											'longitude';
			var elevation = (point.hasOwnProperty('alt') ? 'alt' : false) ||
											(point.hasOwnProperty('altitude') ? 'altitude' : false) ||
											(point.hasOwnProperty('elev') ? 'elev' : false) ||
											'elevation';
			return {
				latitude: latitude,
				longitude: longitude,
				elevation: elevation
			};
		},

		/**
		* Calculates geodetic distance between two points specified by latitude/longitude using 
		* haversine equation
		*
		* @param    object    Start position {latitude: 123, longitude: 123}
		* @param    object    End position {latitude: 123, longitude: 123}
		* @return   float     Distance (in meters)
		*/

		getDistance: function(start, end) {
			function deg2Rad(deg) {
				return deg * (Math.PI / 180);
			}

			var keys = geolib.getKeys(start);
			var latitude = keys.latitude;
			var longitude = keys.longitude;
			var elevation = keys.elevation;

			var coord1 = {}, coord2 = {};
			coord1[latitude] = geolib.useDecimal(start[latitude]);
			coord1[longitude] = geolib.useDecimal(start[longitude]);

			coord2[latitude] = geolib.useDecimal(end[latitude]);
			coord2[longitude] = geolib.useDecimal(end[longitude]);

			var R = 6378137 // Radius of earth in meters
			var dLat = deg2Rad(coord2[latitude] - coord1[latitude]);
			var dLng = deg2Rad(coord2[longitude] - coord1[longitude]);
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			        Math.cos(deg2Rad(coord1[latitude])) * Math.cos(deg2Rad(coord2[latitude])) *
			        Math.sin(dLng/2) * Math.sin(dLng/2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = R * c; // Distance in meters
			return d;
		},


		/**
		* Calculates the distance between two spots. 
		* This method is more simple but also more inaccurate
		*
		* @param    object    Start position {latitude: 123, longitude: 123}
		* @param    object    End position {latitude: 123, longitude: 123}
		* @param    integer   Accuracy (in meters)
		* @return   integer   Distance (in meters)
		*/
		getDistanceSimple: function(start, end, accuracy) {

			var keys = geolib.getKeys(start);
			var latitude = keys.latitude;
			var longitude = keys.longitude;

			accuracy = Math.floor(accuracy) || 1;

			var coord1 = {}, coord2 = {};
			coord1[latitude] = parseFloat(geolib.useDecimal(start[latitude])).toRad();
			coord1[longitude] = parseFloat(geolib.useDecimal(start[longitude])).toRad();

			coord2[latitude] = parseFloat(geolib.useDecimal(end[latitude])).toRad();
			coord2[longitude] = parseFloat(geolib.useDecimal(end[longitude])).toRad();

			var distance = 
				Math.round(
					Math.acos(
						Math.sin(
							coord2[latitude]
						) * 
						Math.sin(
							coord1[latitude]
						) + 
						Math.cos(
							coord2[latitude]
						) * 
						Math.cos(
							coord1[latitude]
						) * 
						Math.cos(
							coord1[longitude] - coord2[longitude]
						) 
					) * radius
				);

			return geolib.distance = Math.floor(Math.round(distance/accuracy)*accuracy);

		},


		/**
		* Calculates the center of a collection of geo coordinates
		*
		* @param		array		Collection of coords [{latitude: 51.510, longitude: 7.1321}, {latitude: 49.1238, longitude: "8° 30' W"}, ...]
		* @return		object		{latitude: centerLat, longitude: centerLng, distance: diagonalDistance}
		*/
		getCenter: function(coords) {

			if (!coords.length) {
				return false;
			}

			var keys = geolib.getKeys(coords[0]);
			var latitude = keys.latitude;
			var longitude = keys.longitude;

			var max = function( array ){
				return Math.max.apply( Math, array );
			};

			var min = function( array ){
				return Math.min.apply( Math, array );
			};

			var	lat, lng, splitCoords = {lat: [], lng: []};

			for(var coord in coords) {
				splitCoords.lat.push(geolib.useDecimal(coords[coord][latitude]));
				splitCoords.lng.push(geolib.useDecimal(coords[coord][longitude]));
			}

			var minLat = min(splitCoords.lat);
			var minLng = min(splitCoords.lng);
			var maxLat = max(splitCoords.lat);
			var maxLng = max(splitCoords.lng);

			lat = ((minLat + maxLat)/2).toFixed(6);
			lng = ((minLng + maxLng)/2).toFixed(6);

			// distance from the deepest left to the highest right point (diagonal distance)
			var distance = geolib.convertUnit('km', geolib.getDistance({lat:minLat, lng:minLng}, {lat:maxLat, lng:maxLng}));

			return {"latitude": lat, "longitude": lng, "distance": distance};

		},

		/**
		* Gets the max and min, latitude, longitude, and elevation (if provided).
		* @param		array		array with coords e.g. [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...] 
		* @return	object		{maxLat: maxLat,
		*                     minLat: minLat		
		*                     maxLng: maxLng,
		*                     minLng: minLng,
		*                     maxElev: maxElev,
		*                     minElev: minElev}
		*/
		getBounds: function(coords) {
			if (!coords.length) {
				return false;
			}

			var keys = geolib.getKeys(coords[0]);
			var latitude = keys.latitude;
			var longitude = keys.longitude;
			var elevation = keys.elevation;

			var useElevation = coords[0].hasOwnProperty(elevation);
			var stats = {
				maxLat: Infinity * -1,
				minLat: Infinity,
				maxLng: Infinity * -1,
				minLng: Infinity,
			};

			if (useElevation) {
				stats.maxElev = Infinity * -1;
				stats.minElev = Infinity;
			}

			for (var i = 0, l = coords.length; i < l; ++i) {
				stats.maxLat = Math.max(coords[i][latitude], stats.maxLat);
				stats.minLat = Math.min(coords[i][latitude], stats.minLat);
				stats.maxLng = Math.max(coords[i][longitude], stats.maxLng);
				stats.minLng = Math.min(coords[i][longitude], stats.minLng);
				if (useElevation) {
					stats.maxElev = Math.max(coords[i][elevation], stats.maxElev);
					stats.minElev = Math.min(coords[i][elevation], stats.minElev);
				}
			}
			return stats;
		},

		/**
		* Checks whether a point is inside of a polygon or not.
		* Note that the polygon coords must be in correct order!
		*
		* @param		object		coordinate to check e.g. {latitude: 51.5023, longitude: 7.3815}
		* @param		array		array with coords e.g. [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...] 
		* @return		bool		true if the coordinate is inside the given polygon
		*/
		isPointInside: function(latlng, coords) {

			var keys = geolib.getKeys(latlng);
			var latitude = keys.latitude;
			var longitude = keys.longitude;

			for(var c = false, i = -1, l = coords.length, j = l - 1; ++i < l; j = i) {

				if(
					(
						(coords[i][longitude] <= latlng[longitude] && latlng[longitude] < coords[j][longitude]) ||
						(coords[j][longitude] <= latlng[longitude] && latlng[longitude] < coords[i][longitude])
					) && 
					(
						latlng[latitude] < (coords[j][latitude] - coords[i][latitude]) * 
						(latlng[longitude] - coords[i][longitude]) / 
						(coords[j][longitude] - coords[i][longitude]) + 
						coords[i][latitude]
					)
				) {
					c = !c;
				}

			}

			return c;

		},


		/**
		* Checks whether a point is inside of a circle or not.
		*
		* @param		object		coordinate to check (e.g. {latitude: 51.5023, longitude: 7.3815})
		* @param		object		coordinate of the circle's center (e.g. {latitude: 51.4812, longitude: 7.4025})
		* @param		integer		maximum radius in meters 
		* @return		bool		true if the coordinate is inside the given radius
		*/
		isPointInCircle: function(latlng, center, radius) {

			return geolib.getDistance(latlng, center) < radius;

		},


		/**
		* Gets rhumb line bearing of two points. Find out about the difference between rhumb line and 
		* great circle bearing on Wikipedia. It's quite complicated. Rhumb line should be fine in most cases:
		*
		* http://en.wikipedia.org/wiki/Rhumb_line#General_and_mathematical_description
		* 
		* Function heavily based on Doug Vanderweide's great PHP version (licensed under GPL 3.0)
		* http://www.dougv.com/2009/07/13/calculating-the-bearing-and-compass-rose-direction-between-two-latitude-longitude-coordinates-in-php/
		*
		* @param		object		origin coordinate (e.g. {latitude: 51.5023, longitude: 7.3815})
		* @param		object		destination coordinate
		* @return		integer		calculated bearing
		*/
		getRhumbLineBearing: function(originLL, destLL) {

			var keys = geolib.getKeys(originLL);
			var latitude = keys.latitude;
			var longitude = keys.longitude;

			// difference of longitude coords
			var diffLon = geolib.useDecimal(destLL[longitude]).toRad() - geolib.useDecimal(originLL[longitude]).toRad();

			// difference latitude coords phi
			var diffPhi = Math.log(Math.tan(geolib.useDecimal(destLL[latitude]).toRad() / 2 + Math.PI / 4) / Math.tan(geolib.useDecimal(originLL[latitude]).toRad() / 2 + Math.PI / 4));

			// recalculate diffLon if it is greater than pi
			if(Math.abs(diffLon) > Math.PI) {
				if(diffLon > 0) {
					diffLon = (2 * Math.PI - diffLon) * -1;
				}
				else {
					diffLon = 2 * Math.PI + diffLon;
				}
			}

			//return the angle, normalized
			return (Math.atan2(diffLon, diffPhi).toDeg() + 360) % 360;

		},


		/**
		* Gets great circle bearing of two points. See description of getRhumbLineBearing for more information
		*
		* @param		object		origin coordinate (e.g. {latitude: 51.5023, longitude: 7.3815})
		* @param		object		destination coordinate
		* @return		integer		calculated bearing
		*/
		getBearing: function(originLL, destLL) {

			var keys = geolib.getKeys(originLL);
			var latitude = keys.latitude;
			var longitude = keys.longitude;

			destLL[latitude] = geolib.useDecimal(destLL[latitude]);
			destLL[longitude] = geolib.useDecimal(destLL[longitude]);
			originLL[latitude] = geolib.useDecimal(originLL[latitude]);
			originLL[longitude] = geolib.useDecimal(originLL[longitude]);

			var bearing = (
				(
					Math.atan2(
						Math.sin(
							destLL[longitude].toRad() - 
							originLL[longitude].toRad()
						) * 
						Math.cos(
							destLL[latitude].toRad()
						), 
						Math.cos(
							originLL[latitude].toRad()
						) * 
						Math.sin(
							destLL[latitude].toRad()
						) - 
						Math.sin(
							originLL[latitude].toRad()
						) * 
						Math.cos(
							destLL[latitude].toRad()
						) * 
						Math.cos(
							destLL[longitude].toRad() - originLL[longitude].toRad()
						)
					)
				).toDeg() + 360
			) % 360;

			return bearing;

		},


		/**
		* Gets the compass direction from an origin coordinate to a destination coordinate.
		*
		* @param		object		origin coordinate (e.g. {latitude: 51.5023, longitude: 7.3815})
		* @param		object		destination coordinate
		* @param		string		Bearing mode. Can be either circle or rhumbline
		* @return		object		Returns an object with a rough (NESW) and an exact direction (NNE, NE, ENE, E, ESE, etc).
		*/
		getCompassDirection: function(originLL, destLL, bearingMode) {

			var direction, bearing;
			if(bearingMode == 'circle') { // use great circle bearing
				bearing = geolib.getBearing(originLL, destLL);
			} else { // default is rhumb line bearing
				bearing = geolib.getRhumbLineBearing(originLL, destLL);
			}

			switch(Math.round(bearing/22.5)) {
				case 1:
					direction = {exact: "NNE", rough: "N"};
					break;
				case 2:
					direction = {exact: "NE", rough: "N"};
					break;
				case 3:
					direction = {exact: "ENE", rough: "E"};
					break;
				case 4:
					direction = {exact: "E", rough: "E"};
					break;
				case 5:
					direction = {exact: "ESE", rough: "E"};
					break;
				case 6:
					direction = {exact: "SE", rough: "E"};
					break;
				case 7:
					direction = {exact: "SSE", rough: "S"};
					break;
				case 8:
					direction = {exact: "S", rough: "S"};
					break;
				case 9:
					direction = {exact: "SSW", rough: "S"};
					break;
				case 10:
					direction = {exact: "SW", rough: "S"};
					break;
				case 11:
					direction = {exact: "WSW", rough: "W"};
					break;
				case 12:
					direction = {exact: "W", rough: "W"};
					break;
				case 13:
					direction = {exact: "WNW", rough: "W"};
					break;
				case 14:
					direction = {exact: "NW", rough: "W"};
					break;
				case 15:
					direction = {exact: "NNW", rough: "N"};
					break;
				default:
					direction = {exact: "N", rough: "N"};
			}

			return direction;

		},


		/**
		* Sorts an array of coords by distance from a reference coordinate
		*
		* @param		object		reference coordinate e.g. {latitude: 51.5023, longitude: 7.3815}
		* @param		mixed		array or object with coords [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...] 
		* @return		array		ordered array
		*/
		orderByDistance: function(latlng, coords) {

			var keys = geolib.getKeys(latlng);
			var latitude = keys.latitude;
			var longitude = keys.longitude;

			var coordsArray = [];
			for(var coord in coords) {
				var d = geolib.getDistance(latlng, coords[coord]);
				coordsArray.push({key: coord, latitude: coords[coord][latitude], longitude: coords[coord][longitude], distance: d});
			}
			
			return coordsArray.sort(function(a, b) { return a.distance - b.distance; });

		},


		/**
		* Finds the nearest coordinate to a reference coordinate
		*
		* @param		object		reference coordinate e.g. {latitude: 51.5023, longitude: 7.3815}
		* @param		mixed		array or object with coords [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...] 
		* @return		array		ordered array
		*/
		findNearest: function(latlng, coords, offset) {

			offset = offset || 0;
			var ordered = geolib.orderByDistance(latlng, coords);
			return ordered[offset];

		},


		/**
		* Calculates the length of a given path
		*
		* @param		mixed		array or object with coords [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...] 
		* @return		integer		length of the path (in meters)
		*/
		getPathLength: function(coords) {

			var dist = 0, last;
			for (var i = 0, l = coords.length; i < l; ++i) {
				if(last) {
					dist += geolib.getDistance(coords[i], last);
				}
				last = coords[i];
			}

			return dist;

		},

		/*global google:true require:true module:true elevationResult*/
		/**
		 *  @params     client_id and private_key for Google Enterprise Accounts
		 *
		 *  @return     Array [{lat:#lat, lng:#lng, elev:#elev},....]}
		 */
		setBusinessSpecificParameters: function(clientId, privateKey){
      gm.config('google-client-id', clientId);
      gm.config('google-private-key', privateKey);
		},

		/**
		 *  @param      Array Collection of coords [{latitude: 51.510, longitude: 7.1321}, {latitude: 49.1238, longitude: "8° 30' W"}, ...]
		 *
		 *  @return     Array [{lat:#lat, lng:#lng, elev:#elev},....]}
		 */
		getElevation: function() {
			if (typeof window.navigator !== 'undefined') {
				geolib.getElevationClient.apply(this, arguments);
			} else {
				geolib.getElevationServer.apply(this, arguments);
			}
		},

		getElevationClient: function(coords, cb) {
			try {
				if (!window.google) {
					return cb(new Error("Geolib: Google maps api not loaded"));
				}
				if (coords.length == 0) {
					return cb(null, null);
				}
				if (coords.length == 1) {
					return cb(new Error("Geolib: getElevation requires at least 2 points."));
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
				elevationService.getElevationAlongPath(positionalRequest,function (results, status){
					geolib.elevationHandler(results, status, coords, keys, cb);
				});
			} catch (e) {
 				return cb(e);
			}
		},

		getElevationServer: function(coords, cb) {
			try {
				if (coords.length == 0) {
					return cb(null, null);
				}
				if (coords.length == 1) {
					return cb(new Error("Geolib: getElevation requires at least 2 points."));
				}
				var path  = [];
				var keys = geolib.getKeys(coords[0]);
				coords[0]
				var latitude = keys.latitude;
				var longitude = keys.longitude;
				for (var i = 0; i < coords.length; i++) {
					path.push(geolib.useDecimal(coords[i][latitude]) + ',' +
										geolib.useDecimal(coords[i][longitude]));
				}
				gm.elevationFromPath(path.join('|'), path.length, function(err, results) {
					geolib.elevationHandler(results.results, results.status, coords, keys, cb)
				});
			} catch (e) {
				return cb(e);
			}
		},

		elevationHandler: function(results, status, coords, keys, cb){
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
        console.log('RESULTS FROM WONKY GOOGLE REQUEST' + results);
				cb(new Error("Geolib: Could not get elevation using Google's API: Status: " + status));
			}
		},

		/**
		 *  @param      Array [{lat:#lat, lng:#lng, elev:#elev},....]}
		 *  @param      integer digits  Decimal places to round to
		 *
		 *  @return     Number % grade
		 */
		getGrade: function(coords, digits) {
			var keys = geolib.getKeys(coords[0]);
			var elevation = keys.elevation;
			var rise = coords[coords.length-1][elevation] - coords[0][elevation];
			var run = geolib.getPathLength(coords);
			var grade = (rise/run)*100;
			if (typeof digits === "number") {
				var d = Math.pow(10,digits);
				grade = Math.floor(grade * d) / d;
			}
			return grade;
		},

		/**
		 *  @param      Array [{lat:#lat, lng:#lng, elev:#elev},....]}
		 *
		 *  @return     Object {gain:#gain, loss:#loss}
		 */
		getTotalElevationGainAndLoss: function(coords) {
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
		},

		/**
		* Converts a distance from meters to km, mm, cm, mi, ft, in or yd
		*
		* @param		string		Format to be converted in
		* @param		float		Distance in meters
		* @param               float           Decimal places for rounding (default: 4)
		* @return		float		Converted distance
		*/
		convertUnit: function(unit, distance, round) {

			if(distance === 0 || typeof distance == 'undefined') {

				if(geolib.distance == 0) {
					return 0;
				} else {
					distance = geolib.distance;
				}

			}

			unit = unit || 'm';
			round = (null == round ? 4 : round);

			switch(unit) {

				case 'm':    // Meter
					return geolib.round(distance, round);
				case 'km':    // Kilometer
					return geolib.round(distance / 1000, round);
				case 'cm':    // Centimeter
					return geolib.round(distance * 100, round);
				case 'mm':    // Millimeter
					return geolib.round(distance * 1000, round);
				case 'mi':    // Miles
					return geolib.round(distance * (1 / 1609.344), round);
				case 'sm':    // Seamiles
					return geolib.round(distance * (1 / 1852.216), round);
				case 'ft':    // Feet
					return geolib.round(distance * (100 / 30.48), round);
				case 'in':    // Inch
					return geolib.round(distance * 100 / 2.54, round);
				case 'yd':    // Yards
					return geolib.round(distance * (1 / 0.9144), round);
			}

			return distance;

		},


		/**
		* Checks if a value is in decimal format or, if neccessary, converts to decimal
		*
		* @param		mixed		Value to be checked/converted
		* @return		float		Coordinate in decimal format
		*/
		useDecimal: function(value) {

			value = value.toString().replace(/\s*/, '');

			// looks silly but works as expected
			// checks if value is in decimal format
			if (!isNaN(parseFloat(value)) && parseFloat(value).toString() == value) {    
				return parseFloat(value);
			// checks if it's sexagesimal format (HHH° MM' SS" (NESW))
			} else if(geolib.isSexagesimal(value) === true) {
				return parseFloat(geolib.sexagesimal2decimal(value));
			} else {
				throw new Error('Geolib: Unknown format.');
			}

		},


		/**
		* Converts a decimal coordinate value to sexagesimal format
		*
		* @param		float		decimal
		* @return		string		Sexagesimal value (XX° YY' ZZ")
		*/
		decimal2sexagesimal: function(dec) {

			if (dec in geolib.sexagesimal) {
				return geolib.sexagesimal[dec];
			}

			var tmp = dec.toString().split('.');

			var deg = Math.abs(tmp[0]);
			var min = ('0.' + tmp[1])*60;
			var sec = min.toString().split('.');

			min = Math.floor(min);
			sec = (('0.' + sec[1]) * 60).toFixed(2);

			geolib.sexagesimal[dec] = (deg + '° ' + min + "' " + sec + '"');

			return geolib.sexagesimal[dec];

		},


		/**
		* Converts a sexagesimal coordinate to decimal format
		*
		* @param		float		Sexagesimal coordinate
		* @return		string		Decimal value (XX.XXXXXXXX)
		*/
		sexagesimal2decimal: function(sexagesimal) {

			if (sexagesimal in geolib.decimal) {
				return geolib.decimal[sexagesimal];
			}

			var	regEx = new RegExp(sexagesimalPattern);
			var	data = regEx.exec(sexagesimal);
			var min = 0, sec = 0;

			if(data) {
				min = parseFloat(data[2]/60);
				sec = parseFloat(data[4]/3600) || 0;
			}

			var	dec = ((parseFloat(data[1]) + min + sec)).toFixed(8);
				// South and West are negative decimals
				dec = (data[7] == 'S' || data[7] == 'W') ? dec * -1 : dec;

			geolib.decimal[sexagesimal] = dec;

			return dec;

		},


		/**
		* Checks if a value is in sexagesimal format
		*
		* @param		string		Value to be checked
		* @return		bool		True if in sexagesimal format
		*/
		isSexagesimal: function(value) {

			return sexagesimalPattern.test(value);

		},

		round: function(value, n) {
			var decPlace = Math.pow(10, n);
			return Math.round(value * decPlace)/decPlace;
		}

	};

	if (typeof(Number.prototype.toRad) === "undefined") {
		Number.prototype.toRad = function() {
			return this * Math.PI / 180;
		};
	}

	if (typeof(Number.prototype.toDeg) === "undefined") {
		Number.prototype.toDeg = function() {
			return this * 180 / Math.PI;
		};
	}

	// we're in a browser
	if(typeof window.navigator != 'undefined') {
		window.geolib = geolib;
	// we're working with node.js, hipster!
	// (experimental support)
	} else {
		module.exports = geolib;
	}

}(this));
