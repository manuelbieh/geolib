import { LongitudeKeys, LatitudeKeys, AltitudeKeys } from './types';

export const sexagesimalPattern =
    /^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,}))?)['′]\s*(([0-9]{1,3}(\.([0-9]{1,}))?)["″]\s*)?([NEOSW]?)$/;
export const earthRadius = 6378137;
export const MINLAT = -90;
export const MAXLAT = 90;
export const MINLON = -180;
export const MAXLON = 180;
export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;

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

// The factors are written as literals instead of expressions like
// `1 / 1609.344` because some bundlers (e.g. esbuild) only drop unused
// objects if they contain nothing but literals.
export const distanceConversion: unitObject = {
    m: 1,
    km: 0.001,
    cm: 100,
    mm: 1000,
    mi: 0.0006213711922373339, // 1 / 1609.344
    sm: 0.0005398938352762313, // 1 / 1852.216
    ft: 3.2808398950131235, // 100 / 30.48
    in: 39.37007874015748, // 100 / 2.54
    yd: 1.0936132983377078, // 1 / 0.9144
};

export const timeConversion: unitObject = {
    m: 60,
    h: 3600,
    d: 86400,
};

const m2 = 1;
const km2 = 0.000001;
const ft2 = 10.763911;
const yd2 = 1.19599;
const in2 = 1550.0031;

// Aliases are part of the literal instead of being assigned afterwards,
// so bundlers can drop the whole object if convertArea is not used.
export const areaConversion: unitObject = {
    m2,
    km2,
    ha: 0.0001,
    a: 0.01,
    ft2,
    yd2,
    in2,
    sqm: m2,
    sqkm: km2,
    sqft: ft2,
    sqyd: yd2,
    sqin: in2,
};
