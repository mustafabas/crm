import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import { Provider } from "react-redux";
import {View} from 'react-native'

import configureStore from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import FlashMessage from "react-native-flash-message";
import  AppBase  from "./AppBase";
import NotificationScreen from "./src/screens/AppScreens/Notification/NotificationScreen";

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={configureStore().store}>
          <PersistGate loading={null} persistor={configureStore().persistor}>
          <AppBase  />
          </PersistGate>
        </Provider>
        <FlashMessage position="top" animated={true} />
      </View>
    );
  }
}