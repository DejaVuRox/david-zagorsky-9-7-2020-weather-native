import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import store from "./store/store";
import { Provider } from "react-redux";
import AppNavigator from "./navigation/AppNavigator";


const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
