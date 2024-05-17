import validateCoords from './validateCoords';

const spy = jest.spyOn(console, 'error');

afterEach(() => {
    spy.mockRestore();
});

describe('validateCoords', () => {
    it('should log errors in the console for invalid from/to coords', () => {
        validateCoords({ from: {}, to: {} });
        expect(spy).toHaveBeenCalledTimes(4);
    });

    it('should NOT log errors in the console for valid from/to coords', () => {
        expect(spy).toHaveBeenCalledTimes(0);
        let from = { lat: 1, lng: 1 };
        let to = { lat: 2, lng: 2 };
        validateCoords({ from, to });
        expect(spy).toHaveBeenCalledTimes(0);
        from = { latitude: 1, longitude: 1 };
        to = { latitude: 2, longitude: 2 };
        validateCoords({ from, to });
        expect(spy).toHaveBeenCalledTimes(0);
        from = { latitude: 1, lon: 1 };
        to = { latitude: 2, lon: 2 };
        validateCoords({ from, to });
        expect(spy).toHaveBeenCalledTimes(0);
    });
});
