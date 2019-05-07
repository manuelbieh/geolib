import { LongitudeKeys, LatitudeKeys, AltitudeKeys } from './types';

export const sexagesimalPattern = /^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,2}))?)'\s*(([0-9]{1,3}(\.([0-9]{1,4}))?)"\s*)?([NEOSW]?)$/;
export const radius = 6378137;
export const minLat = -90;
export const maxLat = 90;
export const minLon = -180;
export const maxLon = 180;

export const longitudeKeys: LongitudeKeys[] = ['lng', 'lon', 'longitude', 0];
export const latitudeKeys: LatitudeKeys[] = ['lat', 'latitude', 1];
export const altitudeKeys: AltitudeKeys[] = [
    'alt',
    'altitude',
    'elevation',
    'elev',
    2,
];

export const conversion = {
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
