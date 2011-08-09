/**
 * A small library to provide some basic geo functions like distance calculation,
 * conversion of decimal coordinates to sexagesimal and vice versa, etc.
 * 
 * @author Manuel Bieh
 * @url http://www.manuel-bieh.de/
 * @version 1.1.0
 * @license http://www.gnu.org/licenses/lgpl-3.0.txt LGPL
 *
 */
;(function () {

	var radius = 6378137 // Earth radius
	var sexagesimalPattern = /^([0-9]{1,3})°\s*([0-9]{1,3})'\s*(([0-9]{1,3}(\.([0-9]{1,2}))?)"\s*)?([NEOSW]?)$/;

	var geolib = {

		decimal: {
		},

		sexagesimal: {
		},

		distance: 0,

		/**
		 * Calculates the distance between two spots
		 *
		 * @param    object    Start position {latitude: 123, longitude: 123}
		 * @param    object    End position {latitude: 123, longitude: 123}
		 * @param    integer   Accuracy (in meters)
		 * @return   integer   Distance (in meters)
		 */
		getDistance: function(start, end, accuracy) {

			accuracy = parseInt(accuracy) || 1;

			var coord1 = {}, coord2 = {};
			coord1.latitude = (geolib.useDecimal(start.latitude)/ 180 * Math.PI);
			coord1.longitude = (geolib.useDecimal(start.longitude)/ 180 * Math.PI);

			coord2.latitude = (geolib.useDecimal(end.latitude)/ 180 * Math.PI);
			coord2.longitude = (geolib.useDecimal(end.longitude)/ 180 * Math.PI);

			var distance = 
				Math.round(
					Math.acos(
						Math.sin(
							coord2.latitude
						) * 
						Math.sin(
							coord1.latitude
						) + 
						Math.cos(
							coord2.latitude
						) * 
						Math.cos(
							coord1.latitude
						) * 
						Math.cos(
							coord1.longitude - coord2.longitude
						) 
					) * radius
				);

			return geolib.distance = parseInt(Math.round(distance/accuracy)*accuracy);

		},


		/**
		 * Calculates the center of a collection of geo coordinates
		 *
		 * @param		array		Collection of coords [{latitude: 51.510, longitude: 7.1321}, {latitude: 49.1238, longitude: "8° 30' W"}, ...]
		 * @return		object		{latitude: centerLat, longitude: centerLng, distance: diagonalDistance}
		 */
		getCenter: function(coords) {

			max = function( array ){
				return Math.max.apply( Math, array );
			};

			min = function( array ){
				return Math.min.apply( Math, array );
			};

			var	lat, lng, splitCoords = {lat: [], lng: []};

			for(coord in coords) {
				splitCoords.lat.push(geolib.useDecimal(coords[coord].latitude));
				splitCoords.lng.push(geolib.useDecimal(coords[coord].longitude));
			}

			var minLat = min(splitCoords.lat);
			var minLng = min(splitCoords.lng);
			var maxLat = max(splitCoords.lat);
			var maxLng = max(splitCoords.lng);

			lat = ((minLat + maxLat)/2).toFixed(6);
			lng = ((minLng + maxLng)/2).toFixed(6);

			// distance from the deepest left to the highest right point (diagonal distance)
			var distance = geolib.convertUnit('km', geolib.getDistance(minLat, minLng, maxLat, maxLng));

			return {"latitude": lat, "longitude": lng, "distance": distance};

		},


		/**
		 * Checks whether a point is inside of a polygon or not.
		 * Note that the polygon coords must be in correct order!
		 *
		 * @param		object		coordinate to check {latitude: 51.5023, longitude: 7.3815}
		 * @param		array		array with coords [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...] 
		 * @return		bool		true if the coordinate is inside the given polygon
		 */
		isPointInside: function(latlng, coords) {

			for(var c = false, i = -1, l = coords.length, j = l - 1; ++i < l; j = i) {

				(
					(coords[i].longitude <= latlng.longitude && latlng.longitude < coords[j].longitude) ||
					(coords[j].longitude <= latlng.longitude && latlng.longitude < coords[i].longitude)
				)
			   && (latlng.latitude < (coords[j].latitude - coords[i].latitude) 
					* (latlng.longitude - coords[i].longitude)
					/ (coords[j].longitude - coords[i].longitude) + coords[i].latitude)
			   && (c = !c);

			}

			return c;

		},


		/**
		 * Sorts an array of coords by distance from a reference coordinate
		 *
		 * @param		object		reference coordinate e.g. {latitude: 51.5023, longitude: 7.3815}
		 * @param		mixed		array or object with coords [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...] 
		 * @return		array		ordered array
		 */
		orderByDistance: function(latlng, coords) {

			var coordsArray = [];
			for(coord in coords) {
				var d = geolib.getDistance(latlng, coords[coord]);
				coordsArray.push({key: coord, latitude: coords[coord].latitude, longitude: coords[coord].longitude, distance: d});
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
		 * Converts a distance from meters to km, mm, cm, mi, ft, in or yd
		 *
		 * @param		string		Format to be converted in
		 * @param		float		Distance
		 * @return		float		Converted distance
		 */
		convertUnit: function(unit, distance, round) {

			if(distance == 0 || typeof distance == 'undefined') {

				if(geolib.distance == 0) {
					// throw 'No distance given.';
					return 0;
				} else {
					distance = geolib.distance;
				}

			}

			unit = unit || 'm';
			round = round || 4;

			switch(unit) {

				case 'm':    // Meter
					return geolib.round(distance, round);
					break;
				case 'km':    // Kilometer
					return geolib.round(distance / 1000, round);
					break;
				case 'cm':    // Centimeter
					return geolib.round(distance * 100, round);
					break;
				case 'mm':    // Millimeter
					return geolib.round(distance * 1000, round);
					break;
				case 'mi':    // Miles
					return geolib.round(distance * (1 / 1609.344), round);
					break;
				case 'sm':    // Seamiles
					return geolib.round(distance * (1 / 1852.216), round);
					break;
				case 'ft':    // Feet
					return geolib.round(distance * (100 / 30.48), round);
					break;
				case 'in':    // Inch
					return geolib.round(distance * 100 / 2.54, round);
					break;
				case 'yd':    // Yards
					return geolib.round(distance * (1 / 0.9144), round);
					break;
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
				return value;
			// checks if it's sexagesimal format (HHH° MM' SS" (NESW))
			} else if(geolib.isSexagesimal(value) == true) {
				return geolib.sexagesimal2decimal(value);
			} else {
				throw 'Unknown format.';
			}

		},


		/**
		 * Converts a decimal coordinate value to sexagesimal format
		 *
		 * @param		float		decimal
		 * @return		string		Sexagesimal value (XX° YY' ZZ")
		 */
		decimal2sexagesimal: function(dec) {

			tmp = dec.toString().split('.');

			var deg = tmp[0];
			var min = ('0.' + tmp[1])*60;
			var sec = min.toString().split('.');

			min = parseInt(min);
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

			var	regEx = new RegExp(sexagesimalPattern);
			var	data = regEx.exec(sexagesimal);

			if(!!data) {
				var min = parseFloat(data[2]/60);
				var sec = parseFloat(data[4]/3600) || 0;
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

	}

	window.geolib = geolib;

})();