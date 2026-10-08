import { describe, expectTypeOf, it } from 'vitest';
import findNearest from './findNearest';
import orderByDistance from './orderByDistance';

type Station = { name: string; lat: number; lng: number };

const stations: Station[] = [
    { name: 'Berlin', lat: 52.525, lng: 13.369 },
    { name: 'Dortmund', lat: 51.518, lng: 7.459 },
];

describe('orderByDistance', () => {
    it('returns the type of the given coordinates', () => {
        expectTypeOf(
            orderByDistance({ lat: 52, lng: 13 }, stations)
        ).toEqualTypeOf<Station[]>();
    });
});

describe('findNearest', () => {
    it('returns the type of the given coordinates', () => {
        expectTypeOf(
            findNearest({ lat: 52, lng: 13 }, stations)
        ).toEqualTypeOf<Station>();
    });
});
