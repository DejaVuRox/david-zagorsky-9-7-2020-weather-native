import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from "../screens/Home";
import Favorites from "../screens/Favorites";

const Tab = createMaterialTopTabNavigator();


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={'Home'} component={Home}/>
        <Tab.Screen name={'Favorites'} component={Favorites}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
