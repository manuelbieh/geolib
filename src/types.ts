export type GeolibLongitudeInputValue = number | string;
export type GeolibLatitudeInputValue = number | string;
export type GeolibAltitudeInputValue = number;

export type GeolibGeoJSONPoint = [
    GeolibLongitudeInputValue,
    GeolibLatitudeInputValue,
    GeolibAltitudeInputValue?
];

export type LongitudeKeys = 'lng' | 'lon' | 'longitude' | 0;
export type LatitudeKeys = 'lat' | 'latitude' | 1;
export type AltitudeKeys = 'alt' | 'altitude' | 'elevation' | 'elev' | 2;

export type GeolibInputLongitude =
    | { lng: GeolibLongitudeInputValue }
    | { lon: GeolibLongitudeInputValue }
    | { longitude: GeolibLongitudeInputValue };

export type GeolibInputLatitude =
    | { lat: GeolibLatitudeInputValue }
    | { latitude: GeolibLatitudeInputValue };

export type GeolibInputAltitude =
    | { alt?: GeolibAltitudeInputValue }
    | { altitude?: GeolibAltitudeInputValue }
    | { elevation?: GeolibAltitudeInputValue }
    | { elev?: GeolibAltitudeInputValue };

export type UserInputCoordinates = GeolibInputLongitude &
    GeolibInputLatitude &
    GeolibInputAltitude;

export type GeolibInputCoordinates = UserInputCoordinates | GeolibGeoJSONPoint;

export type GeolibDistanceFn = (
    point: GeolibInputCoordinates,
    dest: GeolibInputCoordinates
) => number;

export type Timestamp = number;

export type GeolibInputCoordinatesWithTime = GeolibInputCoordinates & {
    time: Timestamp;
};
