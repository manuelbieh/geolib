import getBounds from './getBounds';

const polygon = [
    { latitude: 51.513357512, longitude: 7.45574331 },
    { latitude: 51.515400598, longitude: 7.45518541 },
    { latitude: 51.516241842, longitude: 7.456494328 },
    { latitude: 51.516722545, longitude: 7.459863183 },
    { latitude: 51.517443592, longitude: 7.463232037 },
    { lat: 51.5177507, lon: 7.464755532 },
    { latitude: 51.517657233, longitude: 7.466622349 },
    { latitude: 51.51722995, longitude: 7.468317505 },
    { latitude: 51.516816015, longitude: 7.47011995 },
    { latitude: 51.516308606, longitude: 7.471793648 },
    { latitude: 51.515974782, longitude: 7.472437378 },
    { latitude: 51.515413951, longitude: 7.472845074 },
    { latitude: 51.514559338, longitude: 7.472909447 },
    { latitude: 51.512195717, longitude: 7.472651955 },
    { latitude: 51.511127373, longitude: 7.47140741 },
    { latitude: 51.51029939, longitude: 7.469948288 },
    { latitude: 51.509831973, longitude: 7.468446251 },
    { latitude: 51.509978876, longitude: 7.462481019 },
    [7.460678574, 51.510913701],
    { latitude: 51.511594777, longitude: 7.459434029 },
    { latitude: 51.512396029, longitude: 7.457695958 },
    { latitude: 51.513317451, longitude: 7.45574331 },
];

// TODO: elevation is not used yet. Re-add support for elevation later.
const polygon2 = [
    { latitude: 51.513357512, longitude: 7.45574331, elevation: 523.92 },
    { latitude: 51.515400598, longitude: 7.45518541, elevation: 524.54 },
    { latitude: 51.516241842, longitude: 7.456494328, elevation: 523.12 },
    { latitude: 51.516722545, longitude: 7.459863183, elevation: 522.77 },
    { latitude: 51.517443592, longitude: 7.463232037, elevation: 521.12 },
];

describe('getBounds', () => {
    it('gets the bounds for a polygon', () => {
        expect(getBounds(polygon)).toEqual({
            maxLat: 51.5177507,
            minLat: 51.509831973,
            maxLng: 7.472909447,
            minLng: 7.45518541,
        });

        expect(getBounds(polygon2)).toEqual({
            maxLat: 51.517443592,
            minLat: 51.513357512,
            maxLng: 7.463232037,
            minLng: 7.45518541,
        });
    });
});
