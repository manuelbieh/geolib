/**
 * A small library to provide some basic geo functions like distance calculation,
 * conversion of decimal coordinates to sexagesimal and vice versa, etc.
 * 
 * @author Manuel Bieh
 * @url http://www.manuel-bieh.de/
 * @version 1.0
 * @license http://www.gnu.org/licenses/lgpl-3.0.txt LGPL
 *
 */
;(function () {

	var radius = 6378137 // Earth radius
	var sexagesimalPattern = /^([0-9]{1,3})°\s*([0-9]{1,3})'\s*([0-9]{1,3}(\.([0-9]{1,2}))?)"\s*([NEOSW]?)$/;

	var geolib = {

		decimal: {
		},

		sexagesimal: {
		},

		distance: 0,

		/**
		 * Calculates the distance between two spots
		 *
		 * @param    string    Start "lat,lng" (e.g. 51.503293,7.482374) or Start lat
		 * @param    string    End lat,lng (e.g. 51.473453,7.50324) or Start lng
		 * @param    string    Accuracy (in meters) or End lat
		 * @param    string    NULL or End lng
		 * @param    integer   NULL or Accuracy (in meters)
		 * @return   integer   Distance (in meters)
		 */
		getDistance: function() {

			var start = [];
			var end = [];
			var accuracy;

			switch(arguments.length) {
				case 5:
					accuracy = arguments[4];
				case 5:
				case 4:
					start[0] = arguments[0];
					start[1] = arguments[1];
					end[0] = arguments[2];
					end[1] = arguments[3];
					break;
				case 3:
					accuracy = arguments[2];
				case 3:
				case 2:
					start = arguments[0].split(',');
					end = arguments[1].split(',');
					start[0] = geolib.useDecimal(start[0]);
					start[1] = geolib.useDecimal(start[1]);
					end[0] = geolib.useDecimal(end[0]);
					end[1] = geolib.useDecimal(end[1]);
					break;

			}

			accuracy = accuracy || 1;

			var startn = ((start[0])/ 180 * Math.PI);
			var starte = ((start[1])/ 180 * Math.PI);

			var endn = ((end[0])/ 180 * Math.PI);
			var ende = ((end[1])/ 180 * Math.PI);

			var distance = 
				Math.round(
					Math.acos(
						Math.sin(
							endn
						) * 
						Math.sin(
							startn
						) + 
						Math.cos(
							endn
						) * 
						Math.cos(
							startn
						) * 
						Math.cos(
							starte - ende
						) 
					) * radius
				);

			return geolib.distance = parseInt(Math.round(distance/accuracy)*accuracy);

		},


		/**
		 * Converts a distance from meters to km, mm, cm, mi, ft, in or yd
		 *
		 * @param		string		Format to be converted in
		 * @param		float		Distance
		 * @return		float		Converted distance
		 */
		convertUnit: function(unit, distance) {

			if(distance == 0 || typeof distance == 'undefined') {

				if(geolib.distance == 0) {
					throw 'No distance given.';
				} else {
					distance = geolib.distance;
				}

			}

			unit = unit || 'm';

			switch(unit) {

				case 'm':    // Meter
					return distance;
					break;
				case 'km':    // Kilometer
					return distance / 1000;
					break;
				case 'cm':    // Zentimeter
					return distance * 100;
					break;
				case 'mm':    // Millimeter
					return distance * 1000;
					break;
				case 'mi':    // Meile
					return distance * (1 / 1609.344);
					break;
				case 'sm':    // Seemeile
					return distance * (1 / 1852.216);
					break;
				case 'ft':    // Fuß
					return distance * (100 / 30.48);
					break;
				case 'in':    // Zoll
					return distance * 100 / 2.54;
					break;
				case 'yd':    // Yards
					return distance * (1 / 0.9144);
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

			value = value.replace(/\s*/, '');

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
		 * Converts einen decimal coordinate value to sexagesimal format
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
		 * Converts einen sexagesimal coordinate to decimal format
		 *
		 * @param		float		Sexagesimal coordinate
		 * @return		string		Decimal value (XX.XXXXXXXX)
		 */
		sexagesimal2decimal: function(sexagesimal) {

			var	regEx = new RegExp(sexagesimalPattern);
			var	data = regEx.exec(sexagesimal);

			if(!!data) {
				var min = parseFloat(data[2]/60);
				var sec = parseFloat(data[3]/3600);
			}

			var	dec = ((parseFloat(data[1]) + min + sec)).toFixed(8);
				// South and West are negative decimals
				dec = (data[6] == 'S' || data[6] == 'W') ? dec * -1 : dec;

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

		}

	}

	window.geolib = geolib;

})();