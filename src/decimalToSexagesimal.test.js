import decimalToSexagesimal from './decimalToSexagesimal';

describe('decimalToSexagesimal', () => {
    it('should return minutes and seconds with a leading 0 if < 10', () => {
        expect(decimalToSexagesimal(121.135)).toEqual('121° 08\' 06.0"');
    });

    it('should still return 00 and 00.0 if there are no minutes or seconds', () => {
        expect(decimalToSexagesimal(50)).toEqual('50° 00\' 00.0"');
    });

    it('should always return a positive value', () => {
        expect(decimalToSexagesimal(-19.37555556)).toEqual('19° 22\' 32.0"');
    });

    it('should return seconds with decimal places if needed', () => {
        expect(decimalToSexagesimal(51.519475)).toEqual('51° 31\' 10.11"');
        expect(decimalToSexagesimal(51.516975)).toEqual('51° 31\' 01.11"');
    });

    it('should return precise values', () => {
        expect(decimalToSexagesimal(31.011306)).toEqual('31° 00\' 40.7016"');
    });

    it('should handle precision correctly', () => {
        expect(decimalToSexagesimal(90.99999996)).toEqual('90° 59\' 59.9999"');
        expect(decimalToSexagesimal(90.9999999)).toEqual('90° 59\' 59.9996"');
        expect(decimalToSexagesimal(90.999999)).toEqual('90° 59\' 59.9964"');
        expect(decimalToSexagesimal(90.99999)).toEqual('90° 59\' 59.964"');
        expect(decimalToSexagesimal(90.9999)).toEqual('90° 59\' 59.64"');
        expect(decimalToSexagesimal(90.999)).toEqual('90° 59\' 56.4"');
        expect(decimalToSexagesimal(90.99)).toEqual('90° 59\' 24.0"');
        expect(decimalToSexagesimal(90.9)).toEqual('90° 54\' 00.0"');
        expect(decimalToSexagesimal(90.1)).toEqual('90° 06\' 00.0"');
    });
    it('should carry seconds that round up to 60 into minutes and degrees', () => {
        expect(decimalToSexagesimal(51.99999999)).toEqual('52° 00\' 00.0"');
        expect(decimalToSexagesimal(10.999999999)).toEqual('11° 00\' 00.0"');
        expect(decimalToSexagesimal(-0.9999999999)).toEqual('1° 00\' 00.0"');
        expect(decimalToSexagesimal(12.49999999)).toEqual('12° 30\' 00.0"');
    });

    it('should handle values small enough to be printed in exponent notation', () => {
        expect(decimalToSexagesimal(1.5e-7)).toEqual('0° 00\' 00.0005"');
        expect(decimalToSexagesimal(5e-7)).toEqual('0° 00\' 00.0018"');
        expect(decimalToSexagesimal(-2.5e-7)).toEqual('0° 00\' 00.0009"');
    });
});
