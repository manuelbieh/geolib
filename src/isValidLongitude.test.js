import isValidLongitude from './isValidLongitude';
import { MAXLON, MINLON } from './constants';

describe('isValidLongitude', () => {
    describe('when value is a decimal', () => {
        describe('when value is between MINLON and MAXLON', () => {
            it('returns true', () => {
                let value = MAXLON - 1;
                expect(isValidLongitude(value)).toEqual(true);
                value = MINLON + 1;
                expect(isValidLongitude(value)).toEqual(true);
            });
        });
        describe('when value is not between MINLON and MAXLON', () => {
            it('returns false', () => {
                let value = MAXLON + 1;
                expect(isValidLongitude(value)).toEqual(false);
                value = MINLON - 1;
                expect(isValidLongitude(value)).toEqual(false);
            });
        });
    });
    describe('when value is a sexagesimal', () => {
        describe('when value is between MINLON and MAXLON', () => {
            it('returns true', () => {
                const value = '51° 31\' 10.11" N';
                expect(isValidLongitude(value)).toEqual(true);
            });
        });
        describe('when value is not between MINLON and MAXLON', () => {
            it('returns false', () => {
                const value = '221°26′31″W';
                expect(isValidLongitude(value)).toEqual(false);
            });
        });
    });
    describe('when value is not a decimal or sexagesimal', () => {
        it('returns false', () => {
            const value = 'foo';
            expect(isValidLongitude(value)).toEqual(false);
        });
    });
});
