import decimalToSexagesimal from './decimalToSexagesimal';

console.log();

describe('decimalToSexagesimal', () => {
    it('should return minutes and seconds with a leading 0 if < 10', () => {
        expect(decimalToSexagesimal(121.135)).toEqual('121° 08\' 06"');
    });

    it('should still return 00 and 00 if there are no minutes or seconds', () => {
        expect(decimalToSexagesimal(50)).toEqual('50° 00\' 00"');
    });

    it('should always return a positive value', () => {
        expect(decimalToSexagesimal(-19.37555556)).toEqual('19° 22\' 32"');
    });

    it('should return seconds with decimal places if needed', () => {
        expect(decimalToSexagesimal(51.519475)).toEqual('51° 31\' 10.11"');
        expect(decimalToSexagesimal(51.516975)).toEqual('51° 31\' 01.11"');
    });
});
