import getLatitude from './getLatitude';
import getLongitude from './getLongitude';
import toRad from './toRad';
import { earthRadius } from './constants';
import { GeolibInputCoordinates } from './types';

// Calculates geodetic distance between two points specified by latitude/longitude using
// Vincenty inverse formula for ellipsoids. Taken from:
// https://www.movable-type.co.uk/scripts/latlong-vincenty.html
const getDistance = (
    start: GeolibInputCoordinates,
    end: GeolibInputCoordinates,
    accuracy: number = 1
) => {
    accuracy =
        typeof accuracy !== 'undefined' && !isNaN(accuracy) ? accuracy : 1;

    const startLat = getLatitude(start);
    const startLon = getLongitude(start);
    const endLat = getLatitude(end);
    const endLon = getLongitude(end);

    const b = 6356752.314245;
    const ellipsoidParams = 1 / 298.257223563; // WGS-84 ellipsoid params
    const L = toRad(endLon - startLon);

    let cosSigma;
    let sigma;
    let sinAlpha;
    let cosSqAlpha;
    let cos2SigmaM;
    let sinSigma;

    const U1 = Math.atan(
        (1 - ellipsoidParams) * Math.tan(toRad(parseFloat(startLat)))
    );
    const U2 = Math.atan(
        (1 - ellipsoidParams) * Math.tan(toRad(parseFloat(endLat)))
    );
    const sinU1 = Math.sin(U1);
    const cosU1 = Math.cos(U1);
    const sinU2 = Math.sin(U2);
    const cosU2 = Math.cos(U2);

    let lambda = L;
    let lambdaP;
    let iterLimit = 100;
    do {
        const sinLambda = Math.sin(lambda);
        const cosLambda = Math.cos(lambda);
        sinSigma = Math.sqrt(
            cosU2 * sinLambda * (cosU2 * sinLambda) +
                (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) *
                    (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
        );

        if (sinSigma === 0) {
            // co-incident points
            return 0;
        }

        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        sigma = Math.atan2(sinSigma, cosSigma);
        sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma;
        cosSqAlpha = 1 - sinAlpha * sinAlpha;
        cos2SigmaM = cosSigma - (2 * sinU1 * sinU2) / cosSqAlpha;

        if (isNaN(cos2SigmaM)) {
            // equatorial line: cosSqAlpha=0 (§6)
            cos2SigmaM = 0;
        }
        const C =
            (ellipsoidParams / 16) *
            cosSqAlpha *
            (4 + ellipsoidParams * (4 - 3 * cosSqAlpha));
        lambdaP = lambda;
        lambda =
            L +
            (1 - C) *
                ellipsoidParams *
                sinAlpha *
                (sigma +
                    C *
                        sinSigma *
                        (cos2SigmaM +
                            C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);

    if (iterLimit === 0) {
        // formula failed to converge
        return NaN;
    }

    const uSq = (cosSqAlpha * (earthRadius * earthRadius - b * b)) / (b * b);

    const A =
        1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));

    const B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));

    const deltaSigma =
        B *
        sinSigma *
        (cos2SigmaM +
            (B / 4) *
                (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
                    (B / 6) *
                        cos2SigmaM *
                        (-3 + 4 * sinSigma * sinSigma) *
                        (-3 + 4 * cos2SigmaM * cos2SigmaM)));

    const distance = b * A * (sigma - deltaSigma);

    return Math.round(distance / accuracy) * accuracy;
};

export default getDistance;
