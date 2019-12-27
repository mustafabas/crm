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



import { Icon,Text, Input, Item, Tabs, Tab, TabHeading, Button, ScrollableTab, ListItem, Left, Body, Right, Switch } from 'native-base';
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






interface Props {
    navigation: NavigationScreenProp<NavigationState>;

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






      
    render() {

        // var nameSurname: string = this.props.navigation.getParam("nameSurname");
        // var companyName: string = this.props.navigation.getParam("companyName");

        // var restTotalAmount : string = this.props.navigation.getParam("restTotalAmount");
        // var displayTookTotalAmount : string = this.props.navigation.getParam("displayTookTotalAmount");
        // var totalAmount : string = this.props.navigation.getParam("totalAmount");
        return (
            <View style={{flex:1}}>
           
           <View style={[newStyles.inputContainer,{ paddingTop:10, marginTop:10,paddingBottom:30,justifyContent:'flex-start' }]}>
        
        {/* <Input value="bilal oguz marifet" inputStyle={{ color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />
        <Input value="bilalmarifet@gmail.com" inputStyle={{ color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />
        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: Fonts.size.regular, fontWeight: '700', color: Colors.text, marginTop: 50 }}>Private Information</Text>
        <Input leftIconContainerStyle={{ marginLeft: 0 }} leftIcon={
          <Icon name="phone" />
        } value="05333728696" inputStyle={{ marginLeft: 5, color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />
        <Input leftIconContainerStyle={{ marginLeft: 0 }} leftIcon={
          <Icon name="lock" />
        } value="05333728696" inputStyle={{ marginLeft: 5, color: Colors.text, fontFamily: 'Roboto-Regular' }} containerStyle={{ marginLeft: -10, marginTop: 20 }} />


        <Button  style={{ width: 100 }} onPress={() => logoutUserService()} text="Cikis Yap">

        </Button> */}


      <Text style={{textAlign:'center', fontSize:16}} h4>Adi SoyAdi</Text>



          <Text style={[styles.profileTextStyle,{fontSize:16,marginTop:20,textAlign:'center',marginRight:20}]}>Hakkinda</Text>
         

        <View style={{marginTop:20}}>
        <TouchableOpacity onPress={
          ()=> this.props.navigation.navigate('ProfileEdit')
          // ()=> this.props.getUserInformation(EditProfile.generalInfo)
          } style={styles.profileContainer}>
          <Icon name="ios-person" type="ionicon" color={this.state.iconColor} size={25} />
          <Text style={styles.profileTextStyle}>Profili Düzenle</Text>
         
        </TouchableOpacity>
        <View style={styles.propsSeperator}></View>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('securityProfileEdit')} style={styles.profileContainer}>
          <Icon name="ios-lock" type="ionicon" color={this.state.iconColor} size={25} />
          <Text style={styles.profileTextStyle}>Güvenlik</Text>
          
        </TouchableOpacity>
        <View style={styles.propsSeperator}></View>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Notification')} style={styles.profileContainer}>
          <Icon name="ios-notifications" type="ionicon" color={this.state.iconColor} size={25} />
          <Text style={styles.profileTextStyle}>Bildirim Ayarları</Text>
          
        </TouchableOpacity>
        <View style={styles.propsSeperator}></View>

        <TouchableOpacity onPress={()=> this.props.navigation.navigate('HelpSupport')} style={styles.profileContainer}>
          <Icon name="ios-help-circle-outline" type="ionicon" color={this.state.iconColor} size={25} />
          <Text style={styles.profileTextStyle}>Yardım ve Destek</Text>
        </TouchableOpacity>
        
        <View style={styles.propsSeperator}></View>

        <TouchableOpacity onPress={()=> this.props.navigation.navigate('AboutUs')}  style={styles.profileContainer}>
          <Icon name="ios-at" type="ionicon" color={this.state.iconColor} size={25} />
          <Text style={styles.profileTextStyle}>Hakkımızda</Text>
         
        </TouchableOpacity>
        
        <View style={styles.propsSeperator}></View>

        <TouchableOpacity onPress={()=> this.props.navigation.navigate('products')} style={styles.profileContainer}>
          <Icon name="ios-basket" type="ionicon" color={this.state.iconColor} size={25} />
          <Text style={styles.profileTextStyle}>Ürünlerim</Text>
          
        </TouchableOpacity>
        <View style={styles.propsSeperator}></View>
        <TouchableOpacity onPress={() => this.props.logoutUserService()} style={styles.profileContainer}>
          <Icon name="ios-log-out" type="ionicon" color={this.state.iconColor} size={25} />
          <Text style={styles.profileTextStyle}>Çıkış Yap</Text>
          
        </TouchableOpacity>
        <View style={styles.propsSeperator}></View>
       
        </View>
        

      </View>



                </View>

        )
    }
}

// const mapStateToProps = (state: AppState) => ({
//     isOrderLoading: state.orders.isOrderLoading,
//     orders: state.orders.orders,
//     takeTotalAmount: state.orders.takeTotalAmount,
//     tookTotalAmount: state.orders.tookTotalAmount,
//     restTotalAmount: state.orders.restTotalAmount,
  
//   });
  
//   function bindToAction(dispatch: any, ) {
//     return {
//       GetOrders: (customerId: number, pageIndex: number, pageSize: number) =>
//         dispatch(GetOrders(customerId, pageIndex, pageSize)),
//       GetOrdersMore: (customerId: number, pageIndex: number, pageSize: number) =>
//         dispatch(GetOrdersMore(customerId, pageIndex, pageSize)),
//       AddCash: (orderId: number, amount: string) =>
//         dispatch(AddCash(orderId, Number(amount))),
//       orderDelete: (orderId: number) =>
//         dispatch(orderDelete(orderId)),
//     };
//   }
  
const styles = StyleSheet.create({
    profileContainer : {
      flexDirection:'row', 
      marginTop:20,
      marginLeft:10
  
    },
    profileTextStyle : {
      fontSize:20,
      marginLeft:10,
      fontWeight:"300",
      fontFamily:'Roboto-Regular',
      color:'#5e5e5e'
    },
    propsSeperator : {
      width:'90%',
      backgroundColor:'#b57b7b',
      height:.5,
      marginTop:10,
      alignSelf:'center'
  
    }
  })

export default connect(
    // mapStateToProps,
    // bindToAction
  )(ProfileScreen);




