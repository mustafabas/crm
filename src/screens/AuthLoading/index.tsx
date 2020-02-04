import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

class AuthLoading extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const { navigation } = this.props;
    const userToken = await AsyncStorage.getItem("userToken");
   
    // navigation.navigate(userToken ? "MainStack" : this.getIntro());
    // AsyncStorage.setItem("setToIntrShowed",JSON.stringify(false));

    if(userToken) {
      navigation.navigate("MainStack")
    }else {

      
      AsyncStorage.getItem("setToIntrShowed",(err, value) =>{
        if (err) {

          navigation.navigate("LoginScreen")

      } else {
         let val = JSON.parse(value) // boolean false
          if(val) {
            navigation.navigate("LoginScreen")
           
          }
          else {
            navigation.navigate("introductionStack")
          }
      }
      })

    }
  };

  getIntro = () =>{
    
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
