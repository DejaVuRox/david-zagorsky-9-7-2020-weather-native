import { Dispatch } from "redux";
import { Alert } from "react-native";

const API_KEY = "GbIbOZeumYdlRO2UAhzLwF7kV4Yy7BcG";
export const GET_CURRENT_WEATHER = "GET_CURRENT_WEATHER";
export const GET_FORECAST = "GET_FORECAST";
export const GET_AUTO_COMPLETE = "GET_AUTO_COMPLETE";
export const SEARCH_CITY = "SEARCH_CITY";
export const SET_TEMP_UNIT = "SET_TEMP_UNIT";


export const getCurrentCityWeather = () => async (dispatch: Dispatch, getState: any) => {
  const currentCityData = getState().weather.currentCity;
  try {
    const currentCity = currentCityData && currentCityData;
    const weatherData = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${currentCity?.locationKey}?apikey=${API_KEY}`);

    if (!weatherData.ok) {
      throw new Error(await weatherData.json());
    }

    const resData = await weatherData.json();

    dispatch({
      type: GET_CURRENT_WEATHER,
      payload: { weatherData: resData, currentCity }
    });
  } catch (e) {
    Alert.alert("Something went wrong", e.message);
  }
};

export const getCurrentCityWeatherForecast = (isMetric: boolean) => async (dispatch: Dispatch, getState: any) => {
  const currentCityData = getState().weather.currentCity;
  try {
    const currentCity = currentCityData && currentCityData;
    const weatherData = await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${currentCity?.locationKey}?apikey=${API_KEY}&metric=${isMetric}`);

    if (!weatherData.ok) {
      throw new Error(await weatherData.json());
    }

    const resData = await weatherData.json();

    dispatch({
      type: GET_FORECAST,
      payload: { forecasts: resData, isMetric }
    });
  } catch (e) {
    Alert.alert("Something went wrong", e.message);
  }
};


export const searchCity = (input: string) => async (dispatch: Dispatch) => {
  try {
    const cityData = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?q=${input}&apikey=${API_KEY}`);

    if (!cityData.ok) {
      throw new Error(await cityData.json());
    }

    const resData = await cityData.json();

    const currentCity: ICurrentCityData = {
      locationKey: resData[0].Key.toString(),
      cityName: resData[0].EnglishName.toString()
    };

    dispatch({
      type: SEARCH_CITY,
      payload: { currentCity, searchValue: input }
    });
  } catch (e) {
    Alert.alert("Something went wrong", e.message);
  }
};

export const setTempUnit = (isMetric: boolean) => ({
  type: SET_TEMP_UNIT,
  payload: isMetric
});
