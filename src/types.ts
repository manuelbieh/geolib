export type GeolibLatLonInputValue = number;

export type GeolibAltInputValue = number;

export type GeolibGeoJSONPoint = [
    GeolibLatLonInputValue,
    GeolibLatLonInputValue,
    GeolibAltInputValue?
];

export type InputCoordinates =
    | { [key in 'lon' | 'lat']: GeolibLatLonInputValue }
    | { [key in 'lng' | 'lat']: GeolibLatLonInputValue }
    | { [key in 'longitude' | 'latitude']: GeolibLatLonInputValue };

export type GeolibInputAltitude = {
    [key in 'altitude' | 'alt' | 'elevation' | 'elev' | 2]?: GeolibAltInputValue
};

export type GeolibInputCoordinates =
    | (InputCoordinates & GeolibInputAltitude)
    | GeolibGeoJSONPoint
    | { [key: number]: any };
