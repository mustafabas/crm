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
import { Container, Header, Content, Form, Item, Input, Label,Icon, Button } from 'native-base';

import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginUserService } from "../../../redux/actions/loginAction";
import styles from "../Login/styles";
import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import Hr from "react-native-hr-component";

// import Icon from 'react-native-vector-icons/Ionicons'
// import { Input } from "react-native-elements";

// const logo = require("./water.png");

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
  NameSurname :Yup.string()
  .min(4)
  .max(30)
  .required(),
  email: Yup.string()
    .email()
    .min(4)
    .max(50)
    .required(),
  password: Yup.string()
    .min(6)
    .max(16)
    .required()
});

export default class SignUpSecondScreen extends Component<Props, {}> {

  handleLogin = (values: userData) => {
    const { loginUserService, isSucceed } = this.props;
    // loginUserService(values.username, values.password);
  };

  render() {
   
    return (
      <ImageBackground  source={require('../../../images/background.png')} style={[styles.container,{justifyContent:'flex-start'}]}>
<SafeAreaView>
    
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false} contentContainerStyle={{flexGrow:1}}>
            <Formik
              initialValues={{ phoneNumber: "", companyName: "" ,adress:""}}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                return (
                  <View>
                  
                    <View style={[styles.inputContainer]}>

                      
           
              <View style={{alignSelf:'center',borderBottomWidth:1,borderColor:'white'}}>
              <Text style={{fontFamily:'Avenir Next',fontSize:32,color:'white'}}>Üye Ol</Text>
              </View>
              <View style={{marginTop:'20%'}}>
                
              <Item style={{borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderColor: (props.touched.phoneNumber && props.errors.phoneNumber) ? "#FD0D55" : "#2069F3",borderRadius:30,backgroundColor:'#2069F3',paddingVertical:5
            ,shadowRadius: 5.00,
                    
            elevation: 12,

            shadowColor: "#2069F3",
shadowOffset: {width: 3, height: 3 },
shadowOpacity: .5,}}>
            <Icon style={{color:(props.touched.phoneNumber && props.errors.phoneNumber) ? "#FD0D55" : 'white',marginTop:-0,marginLeft:20}} active name='ios-call' />
            {/* <Label style={{color:'white',fontFamily:"Avenir Next"}} >Email</Label> */}
           
            <Input 

             value={props.values.phoneNumber}
             onChangeText={props.handleChange("phoneNumber")}
             onBlur={ (props.touched.phoneNumber && props.errors.phoneNumber) ? ()=> {
             
              props.setFieldValue('phoneNumber',"") 
              props.handleChange("phoneNumber")
              // props.handleBlur("NameSurname")

             }
             
               
               :  props.handleBlur("phoneNumber")}

               onEndEditing={ (props.touched.phoneNumber && props.errors.phoneNumber) ? ()=> {
             
                props.setFieldValue('phoneNumber',"") 
                props.handleChange("phoneNumber")
                props.handleBlur("phoneNumber")
  
               }
  
               
                 
                 :  props.handleBlur("phoneNumber")}

           
             style={{color:'white',fontFamily:"Avenir Next",paddingTop:0}}
             placeholder= {(props.touched.phoneNumber && props.errors.phoneNumber) ? "Lütfen Telefon Numaranızı" : "0 506 680 4389"}
             placeholderTextColor="#dcdcdc"
             />
            
          </Item>



          
          <Item style={{marginTop:20,borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderColor: (props.touched.companyName && props.errors.companyName) ? "#FD0D55" : "#2069F3",borderRadius:30,backgroundColor:'#2069F3',paddingVertical:5
            ,shadowRadius: 5.00,
                    
            elevation: 12,

            shadowColor: "#2069F3",
shadowOffset: {width: 3, height: 3 },
shadowOpacity: .5,}}>
            <Icon style={{color:(props.touched.companyName && props.errors.companyName) ? "#FD0D55" : 'white',marginTop:-0,marginLeft:20}} active name='ios-business' />
            {/* <Label style={{color:'white',fontFamily:"Avenir Next"}} >Email</Label> */}
           
            <Input 

             value={props.values.companyName}
             onChangeText={props.handleChange("companyName")}
             onBlur={ (props.touched.companyName && props.errors.companyName) ? ()=> {
             
              props.setFieldValue('companyName',"") 
              props.handleChange("companyName")
              // props.handleBlur("NameSurname")

             }
             
               
               :  props.handleBlur("companyName")}

               onEndEditing={ (props.touched.companyName && props.errors.companyName) ? ()=> {
             
                props.setFieldValue('companyName',"") 
                props.handleChange("companyName")
                props.handleBlur("companyName")
  
               }
  
               
                 
                 :  props.handleBlur("companyName")}

           
             style={{color:'white',fontFamily:"Avenir Next",paddingTop:0}}
             placeholder= {(props.touched.companyName && props.errors.companyName) ? "Şirket İsminizi Giriniz." : "Şirket İsmi"}
             placeholderTextColor="#dcdcdc"
             />
            
          </Item>


           <Item style={{marginTop:20,borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderColor: (props.touched.adress && props.errors.adress) ? "#FD0D55" : "#2069F3",borderRadius:30,backgroundColor:'#2069F3',paddingVertical:5
            ,shadowRadius: 5.00,
                    
            elevation: 12,

            shadowColor: "#2069F3",
shadowOffset: {width: 3, height: 3 },
shadowOpacity: .5,}}>
            <Icon style={{color:(props.touched.adress && props.errors.adress) ? "#FD0D55" : 'white',marginTop:-0,marginLeft:20}} active name='ios-list' />
            {/* <Label style={{color:'white',fontFamily:"Avenir Next"}} >Email</Label> */}
           
            <Input 

             value={props.values.adress}
             onChangeText={props.handleChange("adress")}
             onBlur={ (props.touched.adress && props.errors.adress) ? ()=> {
             
              props.setFieldValue('adress',"") 
              props.handleChange("adress")
              // props.handleBlur("NameSurname")

             }
             
               
               :  props.handleBlur("adress")}

               onEndEditing={ (props.touched.adress && props.errors.adress) ? ()=> {
             
                props.setFieldValue('adress',"") 
                props.handleChange("adress")
                props.handleBlur("adress")
  
               }
  
               
                 
                 :  props.handleBlur("adress")}

           
             style={{color:'white',fontFamily:"Avenir Next",paddingTop:0}}
             placeholder= {(props.touched.adress && props.errors.adress) ? "Lütfen Adresinizi Giriniz." : "Adres"}
             placeholderTextColor="#dcdcdc"
             />
            
          </Item>


                      </View>
</View>                      
         
          <Button onPress={()=>this.props.navigation.navigate('PhoneVerification')}  style={{justifyContent:'center',marginTop:30,marginBottom:30,marginHorizontal:40,borderRadius:20,backgroundColor:'#01C3E3',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#006c7e",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
            <Text  style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Devam Et</Text>
          </Button>



                    </View>

                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>

        </SafeAreaView>
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
