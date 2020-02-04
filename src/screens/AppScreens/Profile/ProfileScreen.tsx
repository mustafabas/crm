'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,

    View,
    Platform,
    FlatList,
    Animated,
    ScrollView,
    TouchableOpacity,
    Image,
    AsyncStorage,
    ActivityIndicator,
    Modal,
} from 'react-native';
import newStyles from "../../AuthScreens/Login/styles";



import { Icon,Text, Input, Item, Tabs, Tab, TabHeading, Button, ScrollableTab, ListItem, Left, Body, Right, Switch, Spinner } from 'native-base';
import { Alert } from 'react-native';
import { SafeAreaView, NavigationScreenProp, NavigationState } from 'react-navigation';
import { IOrderItem } from '../../../redux/models/orderModel';
import RBSheet from 'react-native-raw-bottom-sheet';

import * as Yup from "yup";
import { connect } from 'react-redux';
import { GetOrders, GetOrdersMore } from '../../../redux/actions/orderAction';
import { AddCash } from '../../../redux/actions/addCashAction';
import { orderDelete } from '../../../redux/actions/deleteOrderAction';
import OrdersCustomer from '../../../pages/OrdersCustomer';
import { AppState } from '../../../redux/store';
import { Formik } from 'formik';
import { getUserInfo, UserInfo, userType } from '../../../redux/actions/profileActions';
import { logoutUserService, logOut } from '../../../redux/actions/loginAction';

import Rate, { AndroidMarket } from 'react-native-rate'





interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    getUserInfo : () => void;
    loading : boolean;
    userInfo : UserInfo
    message : string;

  }

  
  interface State {
    refreshing: boolean;

  }
  



class ProfileScreen extends Component<Props,State>{



      static navigationOptions = ({navigation}) => ({
        title: 'Profilim',
       
    })


  
    constructor(props: Props) {
      super(props);
      this.state = {

      };
    }


     logOut() {
      //  AsyncStorage.multiRemove(["userToken","userId"])
      //   .then(() => { 
          

      //   })
      //   .catch(error => {

      //   });
        AsyncStorage.removeItem("userToken").then(()=> {
          AsyncStorage.removeItem("userId").then(()=> {
            this.props.navigation.navigate('AuthLoading')
          })
        })

    }
    componentWillMount() {
this.props.getUserInfo()
    }
renderContent() {
  if(this.props.loading && !(this.props.userInfo)) {
      return (
        <Spinner />
      )

  }else if (this.props.userInfo) {
    var userInfo = this.props.userInfo
    return( 
         
      <View style={[newStyles.inputContainer,{ paddingTop:10, marginTop:10,paddingBottom:10,justifyContent:'flex-start' ,paddingRight:0,paddingLeft:10}]}>
        
      

   
{/* 
        <View style={{width:63,height:63,backgroundColor:'#2069F3',alignSelf:'center',borderRadius:31.5,justifyContent:'center'}}>
        <Text style={{alignSelf:'center',fontFamily:'Avenir Next',fontWeight:'600',fontSize:24,color:'white'}}>
          {this.props.userInfo.nameSurname ? this.props.userInfo.nameSurname.substr(0,1) : ""}
          </Text>
            </View> */}
        <Text style={{textAlign:'center', fontSize:20,fontFamily:'Avenir Next',marginTop:10}}>{userInfo != null ? userInfo.nameSurname : "" }</Text>

        {/* <Text style={[styles.profileTextStyle,{fontSize:16,marginTop:20,textAlign:'center',marginRight:20,flex:0}]}>Hakkinda</Text> */}
       
<ScrollView>

<View style={{marginTop:20}}>

<TouchableOpacity onPress={
  ()=> this.props.navigation.navigate('profileEditGeneral')

  } style={styles.profileContainer}>
  <Icon name="ios-person" type="Ionicons" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}} />
  <Text style={styles.profileTextStyle}>Profili Düzenle</Text>
  <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}}/>

</TouchableOpacity>



<View style={styles.propsSeperator}></View>
<TouchableOpacity onPress={()=> this.props.navigation.navigate('Securtiy')} style={styles.profileContainer}>
  <Icon name="ios-lock" type="ionicon" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}} />
  <Text style={styles.profileTextStyle}>Güvenlik</Text>
  <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}}/>

</TouchableOpacity>
<View style={styles.propsSeperator}></View>
{userInfo.userType === userType.companyUser && <TouchableOpacity onPress={()=> this.props.navigation.navigate('companyInfo')}  style={styles.profileContainer}>
  <Icon name="ios-business" type="ionicon" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}} />
  <Text style={styles.profileTextStyle}>Şirket Bilgileri</Text>
  <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}}/>

</TouchableOpacity>} 


<View style={styles.propsSeperator}></View>

<TouchableOpacity onPress={()=> this.props.navigation.navigate('products')} style={styles.profileContainer}>
  <Icon name="ios-basket" type="ionicon" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}} />
  <Text style={styles.profileTextStyle}>Ürünlerim</Text>
  <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}}/>

</TouchableOpacity>
<View style={styles.propsSeperator}></View>
<TouchableOpacity  style={styles.profileContainer}>
  <Icon name="ios-notifications" type="ionicon" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}} />
  <Text style={styles.profileTextStyle}>Bildirim Ayarları</Text>
  <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}}/>

</TouchableOpacity>
<View style={styles.propsSeperator}></View>

<TouchableOpacity onPress={()=> this.props.navigation.navigate('Support')} style={styles.profileContainer}>
  <Icon name="ios-help-circle-outline" type="ionicon" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}} />
  <Text style={styles.profileTextStyle}>Yardım ve Destek</Text>
  <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}}/>

</TouchableOpacity>

<View style={styles.propsSeperator}></View>

<TouchableOpacity onPress={()=> this.props.navigation.navigate('AboutUs')}  style={styles.profileContainer}>
  <Icon name="ios-at" type="ionicon" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}} />
  <Text style={styles.profileTextStyle}>Hakkımızda</Text>
  <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}}/>

</TouchableOpacity>

<View style={styles.propsSeperator}></View>

<TouchableOpacity  onPress={()=>{

    const options = {
      AppleAppID:"1495596894",
  //     GooglePackageName:"com.mywebsite.myapp",
  //     AmazonPackageName:"com.mywebsite.myapp",
  //     OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
  //     preferredAndroidMarket: AndroidMarket.Google,
  //     preferInApp:false,
  //     openAppStoreIfInAppFails:true,
  //     fallbackPlatformURL:"http://www.mywebsite.com/myapp.html",
    }

    AsyncStorage.getItem("IsRateCompleted",(err, value) =>{
      if (err) {

        Rate.rate(options, success=>{
          if (success) {
            // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
            // this.setState({rated:true})
            AsyncStorage.setItem("IsRateCompleted", JSON.stringify(true));

          }
        })

    } else {
       let val = JSON.parse(value) // boolean false
        if(val) {

         
        }
        else {
          Rate.rate(options, success=>{
            if (success) {
              // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
              // this.setState({rated:true})
              AsyncStorage.setItem("IsRateCompleted", JSON.stringify(true));

            }
          })
        }
    }
    })


  }

}
    style={styles.profileContainer}>
  <Icon name="rate-review" type="MaterialIcons" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}} />
  <Text style={styles.profileTextStyle}>Bize Oy Verin</Text>
  <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}}/>

</TouchableOpacity>

<View style={styles.propsSeperator}></View>

<TouchableOpacity onPress={() => this.logOut()} style={styles.profileContainer}>
  <Icon name="ios-log-out" type="ionicon" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}} />
  <Text style={styles.profileTextStyle}>Çıkış Yap</Text>
  <Icon name="right" type="AntDesign" color={this.state.iconColor} style={{fontSize:20,marginTop:Platform.OS === 'ios' ? 5 : 0}}/>

</TouchableOpacity>
{/* <View style={styles.propsSeperator}></View> */}

</View>


</ScrollView>
    </View>


    )
  }
}



      
    render() {

        // var nameSurname: string = this.props.navigation.getParam("nameSurname");
        // var companyName: string = this.props.navigation.getParam("companyName");

        // var restTotalAmount : string = this.props.navigation.getParam("restTotalAmount");
        // var displayTookTotalAmount : string = this.props.navigation.getParam("displayTookTotalAmount");
        // var totalAmount : string = this.props.navigation.getParam("totalAmount");
        return (
            <View style={{flex:1}}>
              
{this.renderContent()}
                </View>

        )
    }
}

const mapStateToProps = (state: AppState) => ({
    loading : state.profile.loadingUserInfo,
    userInfo : state.profile.userInfo,
    message : state.profile.message
  
  });
  
  function bindToAction(dispatch: any, ) {
    return {
     getUserInfo : () => 
     dispatch(getUserInfo())
    };
  }
  
const styles = StyleSheet.create({
    profileContainer : {
      flexDirection:'row', 
      marginTop:10,
      marginLeft:10,

  
    },
    profileTextStyle : {
      fontSize:16,
      marginLeft:10,
      fontWeight:"300",
      fontFamily:'Avenir Next',
      color:'#5e5e5e',
      flex:.92,marginTop:Platform.OS === "ios" ? 5 : 0

    },
    propsSeperator : {
      width:'90%',
      backgroundColor:'#CFD3D7',
      height:.5,
      marginTop:10,
      alignSelf:'center'
  
    }
  })



export default connect(
    mapStateToProps,
    bindToAction
  )(ProfileScreen);




