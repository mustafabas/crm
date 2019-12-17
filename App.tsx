import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import { Provider } from "react-redux";
import {View} from 'react-native'
import AppContainer from "./src/navigation/AppNavigation";
import configureStore from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={configureStore().store}>
          <PersistGate loading={null} persistor={configureStore().persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}
