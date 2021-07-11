import React, { FC } from "react";
import { FlatList, View, Text } from "react-native";
import { connect } from "react-redux";
import Favorite from "../components/Favorite";
import LottieView from "lottie-react-native";
// @ts-ignore
import empty from "../assets/lottie/empty-list.json";

interface IProps {
  favorites: IFavorite[]
  navigation: any
}

const Favorites: FC<IProps> = ({ favorites, navigation }) => {
  if (favorites.length === 0) {
    return (
      <View style={{ alignItems: "center" }}>
        <LottieView style={{ width: 800 }} source={empty} autoPlay loop />
        <Text>nothing here...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        contentContainerStyle={{ alignItems: "center" }}
        keyExtractor={(item, i) => `${i}-${item.cityName}`}
        data={favorites}
        renderItem={({ item: { temperature, weatherDescription, cityName } }) => (
          <Favorite
            cityName={cityName}
            weatherDescription={weatherDescription}
            temperature={temperature}
            navigation={navigation}
          />
        )} />
    </View>
  );
};

const mapStateToProps = (state: any) => ({
    favorites: state.user.favorites
  }
);

export default connect(mapStateToProps)(Favorites);
