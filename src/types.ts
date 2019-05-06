export type GeolibLatLonInputValue = number;

export type GeolibAltInputValue = number;

export type GeolibGeoJSONPoint = [
    GeolibLatLonInputValue,
    GeolibLatLonInputValue,
    GeolibAltInputValue?
];

export interface InputCoordinates =
    | { [key in 'lon' | 'lat']: GeolibLatLonInputValue }
    | { [key in 'lng' | 'lat']: GeolibLatLonInputValue }
    | { [key in 'longitude' | 'latitude']: GeolibLatLonInputValue };

export interface GeolibInputAltitude = {
    [key in 'altitude' | 'alt' | 'elevation' | 'elev' | 2]?: GeolibAltInputValue
};

export interface GeolibInputCoordinates =
    | (InputCoordinates & GeolibInputAltitude)
    | GeolibGeoJSONPoint
    | { [key: number]: any };


// export type InputCoordinates =
//     | { [key in 'lon' | 'lat']: GeolibLatLonInputValue }
//     | { [key in 'lng' | 'lat']: GeolibLatLonInputValue }
//     | { [key in 'longitude' | 'latitude']: GeolibLatLonInputValue };

// export type GeolibInputAltitude = {
//     [key in 'altitude' | 'alt' | 'elevation' | 'elev' | 2]?: GeolibAltInputValue
// };

// export type GeolibInputCoordinates =
//     | (InputCoordinates & GeolibInputAltitude)
//     | GeolibGeoJSONPoint
//     | { [key: number]: any };


