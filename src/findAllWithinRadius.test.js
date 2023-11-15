import findAllWithinRadius from './findAllWithinRadius';

// sample data base on https://developers.google.com/public-data/docs/canonical/countries_csv
const coords = [
    {
        "country": "Australia",
        "latitude": -25.274398,
        "longitude": 133.775136
    },
    {
        "country": "Brazil",
        "latitude": -14.235004,
        "longitude": -51.92528
    },
    {
        "country": "Brunei",
        "latitude": 4.535277,
        "longitude": 114.727669
    },
    {
        "country": "Chile",
        "latitude": -35.675147,
        "longitude": -71.542969
    },
    {
        "country": "Egypt",
        "latitude": 26.820553,
        "longitude": 30.802498
    },
    {
        "country": "France",
        "latitude": 46.227638,
        "longitude": 2.213749
    },
    {
        "country": "Germany",
        "latitude": 51.165691,
        "longitude": 10.451526
    },
    {
        "country": "India",
        "latitude": 20.593684,
        "longitude": 78.96288
    },
    {
        "country": "Indonesia",
        "latitude": -0.789275,
        "longitude": 113.921327
    },
    {
        "country": "Malaysia",
        "latitude": 4.210484,
        "longitude": 101.975766
    },
    {
        "country": "Singapore",
        "latitude": 1.352083,
        "longitude": 103.819836
    },
    {
        "country": "United Kingdom",
        "latitude": 55.378051,
        "longitude": -3.435973
    },
    {
        "country": "United States",
        "latitude": 37.09024,
        "longitude": -95.712891
    }
]

describe('findAllWithinRadius', () => {
    it('should return array of all point within a certain radius including point with distance 0', () => {
        const center = {
            "country": "Indonesia",
            "latitude": -0.789275,
            "longitude": 113.921327
        }
        
        // radius 2000 KM
        const radius = 2000000;
        
        const expected = [
            {
                "country": "Brunei",
                "latitude": 4.535277,
                "longitude": 114.727669
            },
            {
                "country": "Indonesia",
                "latitude": -0.789275,
                "longitude": 113.921327
            },
            {
                "country": "Malaysia",
                "latitude": 4.210484,
                "longitude": 101.975766
            },
            {
                "country": "Singapore",
                "latitude": 1.352083,
                "longitude": 103.819836
            }
        ]

        expect(findAllWithinRadius(center, coords, radius)).toMatchObject(expected);
    });

    it('should return array of all point within a certain radius except point with distance 0', () => {
        const center = {
            "country": "Indonesia",
            "latitude": -0.789275,
            "longitude": 113.921327
        }
        
        // radius 2000 KM
        const radius = 2000000;
        
        const expected = [
            {
                "country": "Brunei",
                "latitude": 4.535277,
                "longitude": 114.727669
            },
            {
                "country": "Malaysia",
                "latitude": 4.210484,
                "longitude": 101.975766
            },
            {
                "country": "Singapore",
                "latitude": 1.352083,
                "longitude": 103.819836
            }
        ]

        expect(findAllWithinRadius(center, coords, radius, true)).toMatchObject(expected);
    });

    it('should return empty array if there are not any point within a certain radius', () => {
        const center = {
            "country": "Indonesia",
            "latitude": -0.789275,
            "longitude": 113.921327
        }
        
        // radius 2000 KM
        const radius = 2000;
        
        const expected = [];

        expect(findAllWithinRadius(center, coords, radius, true)).toMatchObject(expected);
    });
});
