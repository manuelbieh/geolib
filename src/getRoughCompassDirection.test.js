import getRoughCompassDirection from './getRoughCompassDirection';

describe('getRoughCompassDirection', () => {
    describe('when exact compass direction is Northern', () => {
        it('returns N', () => {
            ['NNE', 'NE', 'NNW', 'N'].forEach((exactCompassDirection) => {
                expect(getRoughCompassDirection(exactCompassDirection)).toEqual(
                    'N'
                );
            });
        });
    });
    describe('when exact compass direction is Eastern', () => {
        it('returns E', () => {
            ['ENE', 'E', 'ESE', 'SE'].forEach((exactCompassDirection) => {
                expect(getRoughCompassDirection(exactCompassDirection)).toEqual(
                    'E'
                );
            });
        });
    });
    describe('when exact compass direction is Southern', () => {
        it('returns S', () => {
            ['SSE', 'S', 'SSW', 'SW'].forEach((exactCompassDirection) => {
                expect(getRoughCompassDirection(exactCompassDirection)).toEqual(
                    'S'
                );
            });
        });
    });
    describe('when exact compass direction is Western', () => {
        it('returns W', () => {
            ['WSW', 'W', 'WNW', 'NW'].forEach((exactCompassDirection) => {
                expect(getRoughCompassDirection(exactCompassDirection)).toEqual(
                    'W'
                );
            });
        });
    });
});
