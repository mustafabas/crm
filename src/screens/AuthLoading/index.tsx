import React from "react";
import {
  ActivityIndicator,

  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import {AsyncStorage } from 'react-native'
import { axiosBase } from "../../redux/services/HeaderConfig";
import Axios from "axios";
import { WATER_CREATE_NOTIFICATION } from "../../redux/constants";
import firebase from 'react-native-firebase'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
interface State {
  userId: string | null;
  token: string | null;
  notificationToken: string | null;

}
class AuthLoading extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getUserIdToken();
    this.state = {
      userId: null,
      token: null,
      notificationToken: null
    }
  }


  createNotificationtoken(token: string , userId: string, notificationToken: string | null) {

  

    if (notificationToken) {
      console.log("Onceden Token Var")
      this.props.navigation.navigate("MainStack")
    }
    else {
      console.log("Onceden Token yok")
      this.requestPermissionForNotification(token , userId)

    }
    


  }

  sendTokenToApi(token : string ,userId: string , notificationToken : string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    Axios.post(WATER_CREATE_NOTIFICATION,{
      userId : userId ,
      appToken : notificationToken
    },{headers : headers}).then((res)=> {
      if(res.data.result) {
        AsyncStorage.setItem("notificationToken",notificationToken)
      }
    })
    this.props.navigation.navigate("MainStack")
  }

  async requestPermissionForNotification(token: string , userId: string ) {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken)

       
        this.sendTokenToApi(token,userId , fcmToken)
      } else {
        // user doesn't have a device token yet
      }

    } else {

      try {
        await firebase.messaging().requestPermission();
        // await this.requestPermissionForNotification(token, userId);
      } catch (error) {

      }
    }
  }


  async getUserIdToken() {
    const token = await AsyncStorage.getItem("userToken");
    const userId = await AsyncStorage.getItem("userId");
    const notificationToken = await AsyncStorage.getItem("notificationToken");

    console.log("notification SIlindi mi" + notificationToken)
    this._bootstrapAsync(token, userId, notificationToken)
  }

  _bootstrapAsync = async (token: string | null, userId: string | null, notificationToken: string | null) => {
    const { navigation } = this.props;
    const userToken = await AsyncStorage.getItem("userToken");

    // navigation.navigate(userToken ? "MainStack" : this.getIntro());
    // AsyncStorage.setItem("setToIntrShowed",JSON.stringify(false));


    if (token && userId) {
      this.createNotificationtoken(token, userId, notificationToken)
     
    } else {


      AsyncStorage.getItem("setToIntrShowed", (err, value) => {
        if (err) {

          navigation.navigate("LoginScreen")

        } else {
          let val = JSON.parse(value) // boolean false
          if (val) {

            navigation.navigate("LoginScreen")

          }
          else {
            navigation.navigate("introductionStack")
          }
        }
      })

    }
  };

  getIntro = () => {

  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default AuthLoading;
