import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginUserService } from "../../../redux/actions/loginAction";
import styles from "./styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
// import { Input } from "react-native-elements";

const logo = require("./water.png");

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isFinished: boolean;
  isSucceed: boolean;
  isLoading: boolean;
  loginErrorMessage: string;
  loginUserService: (email: string, password: string) => void;
}

interface userData {
  username: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
    .min(4)
    .max(50)
    .required(),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(6)
    .max(16)
    .required()
});

export default class Login extends Component<Props, {}> {

  handleLogin = (values: userData) => {
    const { loginUserService, isSucceed } = this.props;
    // loginUserService(values.username, values.password);
  };

  render() {
    if (this.props.isSucceed) {
      this.props.navigation.navigate("Customer");
    }
    return (
      <ImageBackground  source={require('../../../images/BackGroundLoginScreen.png')}style={styles.container}>
        <StatusBar backgroundColor="#2B6EDC" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                return (
                  <View>
                    <View style={styles.headStyle}>
                      <Image
                        style={styles.logo}
                        source={logo}

                      />
                      <Text style={styles.headText}>
                        Korkmazlar
                      </Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <View style={styles.input}>
                        {/* <Input
                          inputStyle={{color : 'white'}}
                          placeholder="Kullanıcı Adı / E-posta"
                          placeholderTextColor="white"
                          value={props.values.username}
                          keyboardType="email-address"
                          autoCapitalize="words"
                          autoCorrect={false}
                          onChangeText={props.handleChange("username")}
                          onBlur={props.handleBlur("username")}
                        /> */}
                      </View>
                      <View style={styles.input}>
                        {/* <Input
                          inputStyle={{color:'white'}}

                          placeholder="Şifre"
                          placeholderTextColor="white"
                          value={props.values.password}
                          onChangeText={props.handleChange("password")}
                          onBlur={props.handleBlur("password")}
                          secureTextEntry
                        /> */}
                      </View>
                     




                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>

      </ImageBackground>
    );
  }
}



const mapStateToProps = (state: AppState) => ({
  isFinished: state.login.isFinished,
  isSucceed: state.login.isSucceed,
  isLoading: state.login.isLoading,
  loginErrorMessage: state.login.loginErrorMessage
})

function bindToAction(dispatch: any) {
  return {
    loginUserService: (email: string, password: string) =>
      dispatch(loginUserService(email, password))
  };

}


// export default connect(mapStateToProps, bindToAction)(Login);
