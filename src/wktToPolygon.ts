// Converts a wkt text to polygon
const wktToPolygon = (wkt: string) => {
    if (!wkt.startsWith('POLYGON')) {
        throw new Error('Invalid wkt.');
    }
    const coordsText = wkt
        .slice(wkt.indexOf('(') + 2, wkt.indexOf(')'))
        .split(', ');

    const polygon = coordsText.map((coordText) => {
        const [longitude, latitude] = coordText.split(' ');
        return {
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude),
        };
    });

    return polygon;
};

export default wktToPolygon;
