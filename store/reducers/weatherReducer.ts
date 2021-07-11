import {
  GET_AUTO_COMPLETE,
  GET_CURRENT_WEATHER,
  GET_FORECAST,
  SEARCH_CITY,
  SET_TEMP_UNIT
} from "../actions/weatherActions";

// @ts-ignore
import forecastJson from "../../dummyData/forecast.json";
// @ts-ignore
import currentCity from "../../dummyData/currentCity.json";

type IActionsType =
  typeof GET_CURRENT_WEATHER
  | typeof GET_FORECAST
  | typeof GET_AUTO_COMPLETE
  | typeof SEARCH_CITY
  | typeof SET_TEMP_UNIT

interface IActions {
  type: IActionsType
  payload: any
}


interface IState {
  currentCity: ICurrentCityData | null
  currentWeather: IWeatherData[] | null
  forecastWeather: IForecast[] | null
  forecastHeadline: string
  search: string
  autoCompleteResults: { value: string }[] | null
  isMetric: boolean
}

const initialState: IState = {
  currentCity: null,
  currentWeather: currentCity,
  forecastWeather: forecastJson as IForecast[],
  forecastHeadline: "Pleasant this weekend",
  search: "",
  autoCompleteResults: [],
  isMetric: true
};


export default (state = initialState, action: IActions) => {
  switch (action.type) {
    case SEARCH_CITY:
      return {
        ...state,
        search: action.payload.searchValue,
        currentCity: action.payload.currentCity
      };

    case SET_TEMP_UNIT:
      return {
        ...state,
        isMetric: action.payload
      };

    case GET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload.weatherData,
        currentCity: action.payload.currentCity
      };

    case GET_FORECAST:
      return {
        ...state,
        forecastWeather: action.payload.forecasts.DailyForecasts,
        forecastHeadline: action.payload.forecasts.Headline.Text,
        isMetric: action.payload.isMetric
      };

    case GET_AUTO_COMPLETE:
      const autoComplete: { value: string }[] = [];
      action.payload.autoComplete.forEach((autoCompleteSuggestion: any) => {
        autoComplete.push({ value: autoCompleteSuggestion.LocalizedName });
      });

      return {
        ...state,
        search: action.payload.searchValue,
        autoCompleteResults: autoComplete
      };

    default:
      return state;
  }
}
