interface ICurrentCityData {
    locationKey: string
    cityName: string
}

interface IWeatherData {
    LocalObservationDateTime: string,
    EpochTime: number,
    WeatherText: string,
    WeatherIcon: number,
    HasPrecipitation: boolean,
    PrecipitationType: any,
    IsDayTime: boolean,
    Temperature: {
        Metric: {
            Value: number,
            Unit: string,
            UnitType: number
        },
        Imperial: {
            Value: number,
            Unit: string,
            UnitType: number
        }
    },
    MobileLink: string,
    Link: string
}

interface IForecast {
    Date: string,
    EpochDate: number,
    Temperature: {
        Minimum: {
            Value: number,
            Unit: string,
            UnitType: number
        },
        Maximum: {
            Value: number,
            Unit: string,
            UnitType: number
        }
    },
    Day: {
        Icon: number,
        IconPhrase: string,
        HasPrecipitation: false
    },
    Night: {
        Icon: number,
        IconPhrase: string,
        HasPrecipitation: false
    },
    Sources: [
        'AccuWeather'
    ],
    MobileLink: string
    Link: string
}

interface IAutoComplete {
    Version: number,
    Key: string,
    Type: string,
    Rank: number,
    LocalizedName: string,
    Country: {
        ID: string,
        LocalizedName: string
    },
    AdministrativeArea: {
        ID: string,
        LocalizedName: string
    }
}


interface IFavorite {
    cityName: string
    temperature: string,
    weatherDescription: string
}
