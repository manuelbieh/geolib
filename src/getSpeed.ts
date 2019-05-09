// import getDistance from './getDistance';

// /**
//  * Calculates the speed between to points within a given time span.
//  *
//  * @param        object      coords with javascript timestamp {latitude: 51.5143, longitude: 7.4138, time: 1360231200880}
//  * @param        object      coords with javascript timestamp {latitude: 51.5502, longitude: 7.4323, time: 1360245600460}
//  * @param        object      options (currently "unit" is the only option. Default: km(h));
//  * @return       float       speed in unit per hour
//  */
// const getSpeed = (start, end, options) => {
//     let unit = (options && options.unit) || 'km';

//     if (unit == 'mph') {
//         unit = 'mi';
//     } else if (unit == 'kmh') {
//         unit = 'km';
//     }

//     const distance = geolib.getDistance(start, end);
//     const time = Number(end.time) / 1000 - Number(start.time) / 1000;
//     const mPerHr = distance / time * 3600;
//     const speed = Math.round(mPerHr * this.measures[unit] * 10000) / 10000;
//     return speed;
// },
