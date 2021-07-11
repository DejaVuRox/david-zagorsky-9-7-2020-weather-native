import React, { FC, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Input } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import Forecast from "../components/Forecast";
import LottieView from "lottie-react-native";
// @ts-ignore
import robot from "../assets/lottie/robot-bot-3d.json";
import CurrentCity from "../components/CurrentCity";
import { resetSave, saveToFavorites } from "../store/actions/userActions";
import { getCurrentCityWeather, getCurrentCityWeatherForecast, searchCity } from "../store/actions/weatherActions";

interface IProps {
  forecasts: IForecast[]
  currentWeather: IWeatherData[]
  currentCity: ICurrentCityData
  isMetric: boolean
  saveToFavorites: (favorite: IFavorite, saved: boolean) => void
  searchCity: (input: string) => void
  resetSave: () => void
  getCurrentCityWeather: () => void
  getCurrentCityWeatherForecast: (isMetric: boolean) => void
}

const Home: FC<IProps> = ({
                            forecasts,
                            currentWeather,
                            isMetric,
                            currentCity,
                            saveToFavorites,
                            resetSave,
                            searchCity,
                            getCurrentCityWeather,
                            getCurrentCityWeatherForecast
                          }) => {

  const { control, handleSubmit, formState: { errors } } = useForm();
  const temp = isMetric ? currentWeather[0]?.Temperature?.Metric.Value : currentWeather[0]?.Temperature?.Imperial.Value;
  const tempUnits = isMetric ? currentWeather[0]?.Temperature?.Metric.Unit : currentWeather[0]?.Temperature?.Imperial.Unit;

  useEffect(() => {
    getCurrentCityWeather();
    getCurrentCityWeatherForecast(isMetric);
  }, [currentCity?.cityName, isMetric]);


  const handleFavorites = () => {
    const city: IFavorite = {
      cityName: currentCity?.cityName || "City",
      temperature: temp + tempUnits,
      weatherDescription: currentWeather[0].WeatherText
    };
    saveToFavorites(city, true);
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>

        <LottieView style={{ width: 100 }} source={robot} autoPlay autoSize loop />

        <View style={{ flexDirection: "column", marginBottom: 10, width: "65%" }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                placeholder="Type City Name..."
              />
            )}
            name="city"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.city &&
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#ed0d0d" }}>
              You did not provide a city name
            </Text>
          </View>}
        </View>

        <View style={styles.iconContainer}>
          <Icon
            name={"search"}
            size={28}
            color={"#8b8b8b"}
            onPress={handleSubmit((data => {
              searchCity(data.city);
              resetSave();
            }))}
          />
        </View>
      </View>

      <CurrentCity
        currentCity={currentCity}
        currentWeather={currentWeather}
        isMetric={isMetric}
        handleFavorites={handleFavorites}
        temp={temp}
        tempUnits={tempUnits}
      />

      {forecasts.length > 0 && <FlatList
        keyExtractor={(item, i) => `${i}-${item.Date}`}
        data={forecasts}
        renderItem={({ item: { Date, Temperature } }) => (
          <Forecast day={Date} temperature={
            Temperature.Maximum.Value + Temperature.Maximum.Unit
          } />
        )} />}
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  forecasts: state.weather.forecastWeather,
  currentWeather: state.weather.currentWeather,
  currentCity: state.weather.currentCity,
  isMetric: state.weather.isMetric

});

export default connect(mapStateToProps, {
  saveToFavorites,
  searchCity,
  resetSave,
  getCurrentCityWeather,
  getCurrentCityWeatherForecast
})(Home);

const styles = StyleSheet.create({
  searchContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginBottom: 20,
    borderColor: "#ccc",
    borderRadius: 50,
    backgroundColor: "#ccc"
  }
});
