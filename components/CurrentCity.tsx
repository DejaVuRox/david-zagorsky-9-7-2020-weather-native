import React, { FC } from "react";
import { View, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from "react-redux";

interface IProps {
  currentWeather: IWeatherData[] | null
  currentCity: ICurrentCityData | null
  isMetric: boolean
  handleFavorites: () => void
  temp: React.ReactText;
  tempUnits: string;
  saved: boolean
}

const CurrentCity: FC<IProps> = ({ currentCity, currentWeather, handleFavorites, temp, tempUnits, saved }) => {

  if (currentWeather) {

    return (
      <View>
        <Card>
          <Card.Title style={{ fontSize: 32 }}>{currentCity?.cityName || "Dummy Data"}</Card.Title>
          <Card.Divider />
          <Text style={{ marginBottom: 10, fontSize: 18 }}>
            Conditions: {currentWeather[0].WeatherText}
          </Text>
          <Text style={{ marginBottom: 10, fontSize: 18 }}>
            Temperature: {temp}{tempUnits}
          </Text>
          <Button
            disabled={saved}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title={saved ? "SAVED!" : "SAVE TO FAVORITES"}
            onPress={() => {
              handleFavorites();
            }}
          />
        </Card>
      </View>
    );
  }

  return (
    <View>

    </View>
  );
};

const mapStateToProps = (state: any) => ({
  saved: state.user.saved
});

export default connect(mapStateToProps)(CurrentCity);
