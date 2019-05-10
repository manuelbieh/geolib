import convertSpeed from './convertSpeed';

describe('convertSpeed', () => {
    it('converts the result of getSpeed() into different units (kmh, mph)', () => {
        expect(convertSpeed(29.86777777777778, 'kmh')).toEqual(107.524);
        expect(convertSpeed(29.86777777777778, 'mph')).toEqual(
            66.8123160741271
        );
    });
});
