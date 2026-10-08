// Matches the exterior ring of a WKT polygon. Holes and z/m values are
// ignored.
const polygonPattern = /^\s*POLYGON\s*(?:ZM|Z|M)?\s*\(\s*\(?([^()]*)\)/i;

// Converts a wkt text to polygon
const wktToPolygon = (wkt: string) => {
    const exteriorRing = polygonPattern.exec(wkt);

    if (exteriorRing === null) {
        throw new Error('Invalid wkt.');
    }

    return exteriorRing[1].split(',').map((position) => {
        const [longitude, latitude] = position.trim().split(/\s+/);
        return {
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude),
        };
    });
};

export default wktToPolygon;
