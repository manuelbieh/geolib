import getLongitude from './getLongitude';

describe('getLongitude', () => {
    it('gets the longitude for a point', () => {
        expect(getLongitude({ lng: 1 })).toEqual(1);
    });

    it('converts the longitude for a point to decimal', () => {
        expect(getLongitude({ lng: "71° 0'" })).toEqual(71);
    });

    it('gets the longitude from a GeoJSON array', () => {
        expect(getLongitude([1, 2])).toEqual(1);
    });

    it('does not convert to decimal if second parameter is set to true', () => {
        expect(getLongitude({ lng: "71° 0'" }, true)).toEqual("71° 0'");
    });

    it('gets the longitude from a GeoJSON array without conversion', () => {
        expect(getLongitude(["71° 0'", "71° 0'"], true)).toEqual("71° 0'");
    });
});
