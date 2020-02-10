'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  Animated,
  ScrollView,
  TouchableOpacity,
  Image,

  ActivityIndicator,
  Modal,
  Linking,
} from 'react-native';
import {AsyncStorage } from 'react-native'

import { Icon, Input, Item, Tabs, Tab, TabHeading, Button, ScrollableTab, Card, CardItem,Body, Spinner } from 'native-base';
import { Alert } from 'react-native';
import { SafeAreaView, NavigationScreenProp, NavigationState } from 'react-navigation';
import { IOrderItem } from '../../../redux/models/orderModel';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesNew from "../../styles";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { GetOrders, GetOrdersMore, GetCustomerDetail } from '../../../redux/actions/orderAction';
import { AddCash } from '../../../redux/actions/addCashAction';
import { orderDelete } from '../../../redux/actions/deleteOrderAction';
import OrdersCustomer from '../../../pages/OrdersCustomer';
import { AppState } from '../../../redux/store';
import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';
import { ICustomerDetailItem } from '../../../redux/models/homeModel';
import customer from '../../../pages/customer';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";
import { InfoItem } from '../../../components/InfoItem';
import { getCustomerOrderDetail, orderDetail } from '../../../redux/actions/orderDetailActions';




interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  getCustomerOrderDetail : (orderId : number) => void;
  loading : boolean | null;
  message : string;
  orderDetail : orderDetail;

}



interface State {
  
}





class OrderDetailScreen extends Component<Props, State>{

//   showSimpleMessage() {

//     if (this.props.Message) {

//       showMessage({
//         message: this.props.Message,
//         type: this.props.isSuccess ? "success" : "danger",
//         icon: 'auto'
//       }
//       );
//     }
//     if (this.props.MessageAddCash) {
//       showMessage({
//         message: this.props.MessageAddCash,
//         type: this.props.isSuccessAddCash ? "success" : "danger",
//         icon: 'auto'
//       }
//       );
//     }

//   }



  
   static navigationOptions = ({ navigation }) => ({
    title: 'Sipariş Detay',
    headerRight: () => {
        let orderId = navigation.getParam('orderId')
      return (
        <View style={{marginRight:10}} >
          <Text style={{color:'white',textAlign:'right'}}>Sipariş No</Text>
       
         <Text style={{textAlign:'right',color:'white'}}>{orderId}</Text>
        
        </View>
      )
    }
  })


  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false,
      modalVisible: false,
      orderId: 0,
      amount: 0,
      modalAmountVisible: false,
      modalPriceVisible: false,
      unitPrice: 0,
      count: 0,
      productId: 0,
      productName: "",
      page: 0,
      isPaid: false,
    };
  }

  componentWillMount(){
      this.props.getCustomerOrderDetail(this.props.navigation.getParam('orderId'));

  }

  renderContent(){

    if(this.props.loading || this.props.loading === null ) {
        return (
            <Spinner />
        )
    }else if (this.props.loading === false && this.props.orderDetail){
        let detail = this.props.orderDetail
    

      return( 
         <View>
              <View style={{padding:10,borderBottomWidth:1,borderBottomColor:"#eeeeee",marginBottom:20}}>
              <Text style={{fontFamily:'Avenir Next',fontSize:18}}>{detail.customerName}</Text>
      <Text style={{color:"#8f8f8f",fontFamily:'Avenir Next'}}>{detail.companyName}</Text>
          </View>


          <View style={{padding:10,borderBottomWidth:1,borderBottomColor:"#eeeeee",marginBottom:20,}}>
           <View style={{flexDirection:'row'}}>
      <Text style={{fontFamily:'Avenir Next',fontWeight:'600',fontSize:18,flex:1}}>{detail.productName}</Text>
           <Text style={{fontFamily:'Avenir Next',fontWeight:'300',alignSelf:'center',marginLeft:10}}>Adet: {detail.count}</Text>
           </View>
            
            
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Text style={{fontFamily:'Cabin-Regular',color:'#b3b3b3',marginTop:10,textAlign:'left'}}>{detail.createdDate}</Text>
           <Text style={{fontFamily:'Avenir Next',fontWeight:'300',marginTop:10,textAlign:'right'}}>Fiyat: {detail.displayUnitPrice}</Text>
           </View>
            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
            <Text style={{fontFamily:'Avenir Next',fontWeight:'300',marginTop:10,textAlign:'right'}}>Toplam: </Text>
            <Text style={{fontFamily:'Avenir Next',fontWeight:'300',marginTop:10,textAlign:'right'}}>{detail.displayTotalPrice}</Text>
            </View>
          </View>

          <View style={{padding:10}}>
              <Text style={{fontFamily:'Avenir Next',fontSize:20,fontWeight:'700',color:'#8c8c8c',marginLeft:10}}>Teslimat Adresi</Text>
             <View style={{flexDirection:'row',marginTop:20,borderBottomWidth:1,borderBottomColor:"#eeeeee",paddingBottom:20,justifyContent:'space-between'}}>
               
          

                <View style={{flexDirection:'row',flex:.5}}>
                <Icon name="ios-pin" style={{fontSize:20,color:'#216AF4'}}/>
               
               
               
                <TouchableOpacity style={{}}>
      <Text style={{fontFamily:'Avenir Next',fontWeight:'500',color:'#8c8c8c',marginLeft:10}}>{detail.customerAddress ? detail.customerAddress : "Adres Bilgisi Bulunamadı."}</Text>
            </TouchableOpacity>

            </View>

            
        
           <TouchableOpacity >
           <Icon name="ios-eye" style={{fontSize:20,color:'#216AF4'}}/>
           </TouchableOpacity>
             </View>
          </View>
       

          <View style={{padding:10}}>
              <Text style={{fontFamily:'Avenir Next',fontSize:20,fontWeight:'700',color:'#8c8c8c',marginLeft:10}}>İletişim Bilgileri</Text>
             <View style={{flexDirection:'row',marginTop:20,borderBottomWidth:1,borderBottomColor:"#eeeeee",paddingBottom:20,justifyContent:'space-between'}}>
               
          

                <View style={{flexDirection:'row',flex:.5}}>
                <Icon name="ios-call" style={{fontSize:20,color:'#216AF4'}}/>
               
               
               
                <TouchableOpacity style={{}}>
            <Text style={{fontFamily:'Avenir Next',fontWeight:'500',color:'#8c8c8c',marginLeft:10}}>{detail.customerPhoneNumber ?detail.customerPhoneNumber : "İletişim Bilgisi Bulunamadı"}</Text>
            </TouchableOpacity>

            </View>

            
        
           <TouchableOpacity >
           <Icon name="ios-eye" style={{fontSize:20,color:'#216AF4'}}/>
           </TouchableOpacity>
             </View>
          </View>
       


         </View>
      )
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={{}}>

        {this.renderContent()}


        </ScrollView>
        {/* {this.showSimpleMessage()} */}
        <View style={{backgroundColor:'#EFF3F9',justifyContent:'flex-end',paddingVertical:20}}>
        <Button  style={{justifyContent:'center',marginHorizontal:20,backgroundColor:'#216AF4',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#216AF4",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
            <Text style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Place Order</Text>
          </Button>
        </View>
      </View>

    )
  }
}

const mapStateToProps = (state: AppState) => ({
loading : state.orderDetail.isLoading,
orderDetail : state.orderDetail.orderDetail,
message :state.orderDetail.message


}
);

function bindToAction(dispatch: any) {
  return {
    getCustomerOrderDetail : (orderId : number) => 
                 dispatch(getCustomerOrderDetail(orderId))
  };
}



export default connect(
  mapStateToProps,
  bindToAction
)(OrderDetailScreen);




