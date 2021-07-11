import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import LottieView from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";
// @ts-ignore
import sunny from "../assets/lottie/weather-day-clear-sky.json";


interface IProps {
  day: string
  temperature: string
}

const Forecast: FC<IProps> = ({ day, temperature }) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const daysIndex = new Date(day).getDay();

  return (
    <ListItem
      style={styles.container}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ["#d4d3d3", "#e6e7ec"],
        start: {
          x: 1,
          y: 0
        },
        end: {
          x: 0.2,
          y: 0
        }
      }}
    >
      <ListItem.Content>
        <View style={styles.forecastContainer}>
          <View>
            <LottieView style={styles.lottie} source={sunny} autoPlay autoSize loop />
          </View>
          <View>
            <Text style={{ fontSize: 24 }}>{days[daysIndex]}</Text>
          </View>

          <View>
            <Text style={{ fontSize: 24 }}>{temperature}</Text>
          </View>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  forecastContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    width: "100%"
  },
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10
  },
  lottie: {
    width: 100
  }
});
