import { LongitudeKeys, LatitudeKeys, AltitudeKeys } from './types';

export const sexagesimalPattern = /^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,}))?)['′]\s*(([0-9]{1,3}(\.([0-9]{1,}))?)["″]\s*)?([NEOSW]?)$/;
export const earthRadius = 6378137;
export const MINLAT = -90;
export const MAXLAT = 90;
export const MINLON = -180;
export const MAXLON = 180;

export const longitudeKeys: LongitudeKeys[] = ['lng', 'lon', 'longitude', 0];
export const latitudeKeys: LatitudeKeys[] = ['lat', 'latitude', 1];
export const altitudeKeys: AltitudeKeys[] = [
    'alt',
    'altitude',
    'elevation',
    'elev',
    2,
];

type unitObject = {
    [key: string]: number;
};

export const distanceConversion: unitObject = {
    m: 1,
    km: 0.001,
    cm: 100,
    mm: 1000,
    mi: 1 / 1609.344,
    sm: 1 / 1852.216,
    ft: 100 / 30.48,
    in: 100 / 2.54,
    yd: 1 / 0.9144,
};

export const timeConversion: unitObject = {
    m: 60,
    h: 3600,
    d: 86400,
};
