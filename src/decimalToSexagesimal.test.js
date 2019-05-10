import decimalToSexagesimal from './decimalToSexagesimal';

describe('decimalToSexagesimal', () => {
    it('returns a sexagesimal for a decimal value', () => {
        // console.log(decimalToSexagesimal(121.135));
        // console.log(decimalToSexagesimal(51.519475));
        // console.log(decimalToSexagesimal(-19.37555556));
        // console.log(decimalToSexagesimal(50));

        expect(decimalToSexagesimal(51.519475)).toEqual('51° 31\' 10.11"');
        expect(decimalToSexagesimal(-19.37555556)).toEqual('19° 22\' 32"');
        expect(decimalToSexagesimal(50)).toEqual('50° 0\' 0"');
    });
});
