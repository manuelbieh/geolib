import isValidLatitude from './isValidLatitude';
import { MAXLAT, MINLAT } from './constants';

describe('isValidLatitude', () => {
    describe('when value is a decimal', () => {
        describe('when value is between MINLAT and MAXLAT', () => {
            it('returns true', () => {
                let value = MAXLAT - 1;
                expect(isValidLatitude(value)).toEqual(true);
                value = MINLAT + 1;
                expect(isValidLatitude(value)).toEqual(true);
            });
        });
        describe('when value is not between MINLAT and MAXLAT', () => {
            it('returns false', () => {
                let value = MAXLAT + 1;
                expect(isValidLatitude(value)).toEqual(false);
                value = MINLAT - 1;
                expect(isValidLatitude(value)).toEqual(false);
            });
        });
    });
    describe('when value is a sexagesimal', () => {
        describe('when value is between MINLAT and MAXLAT', () => {
            it('returns true', () => {
                const value = '51° 31\' 10.11" N';
                expect(isValidLatitude(value)).toEqual(true);
            });
        });
        describe('when value is not between MINLAT and MAXLAT', () => {
            it('returns false', () => {
                const value = '121°26′31″W';
                expect(isValidLatitude(value)).toEqual(false);
            });
        });
    });
    describe('when value is not a decimal or sexagesimal', () => {
        it('returns false', () => {
            const value = 'foo';
            expect(isValidLatitude(value)).toEqual(false);
        });
    });
});
