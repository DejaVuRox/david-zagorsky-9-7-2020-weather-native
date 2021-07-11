import React, { FC } from "react";
import { Button, Card, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { searchCity } from "../store/actions/weatherActions";
import { removeFromFavorites } from "../store/actions/userActions";

interface IProps {
  searchCity: (input: string) => void
  removeFromFavorites: (cityName: string, saved: boolean) => void
  navigation: any
}

const Favorite: FC<IFavorite & IProps> = ({
                                            cityName,
                                            temperature,
                                            weatherDescription,
                                            removeFromFavorites,
                                            searchCity,
                                            navigation
                                          }) => {
  return (
    <Card>
      <Card.Title style={styles.title}>{cityName || "City"}</Card.Title>
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>
        Conditions: {weatherDescription}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        Temperature: {temperature}
      </Text>
      <View style={styles.btnContainer}>
        <Button
          containerStyle={styles.btn}
          title={"Go to forecast"}
          onPress={() => {
            searchCity(cityName);
            navigation.jumpTo("Home");
          }}
        />
        <Button
          containerStyle={styles.btn}
          type={"outline"}
          title={"Remove"}
          onPress={() => removeFromFavorites(cityName, false)}
        />
      </View>
    </Card>
  );
};

export default connect(null, { searchCity, removeFromFavorites })(Favorite);

const styles = StyleSheet.create({
  btn: {
    margin: 5
  },
  btnContainer: {
    flexDirection: "row"
  },
  container: {
    margin: 10,
    padding: 10,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ccc"

  },
  title: {
    fontSize: 18,
    padding: 5
  }
});
