'use strict';
import React, {Component} from 'react';
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
    AsyncStorage,
    ActivityIndicator,
    Modal,
} from 'react-native';

import { Icon, Input, Item, Tabs, Tab, TabHeading, Button, ScrollableTab } from 'native-base';
import { Alert } from 'react-native';
import { SafeAreaView, NavigationScreenProp, NavigationState } from 'react-navigation';
import { IOrderItem } from '../../../redux/models/orderModel';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from "../../../pages/styles";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { GetOrders, GetOrdersMore } from '../../../redux/actions/orderAction';
import { AddCash } from '../../../redux/actions/addCashAction';
import { orderDelete } from '../../../redux/actions/deleteOrderAction';
import OrdersCustomer from '../../../pages/OrdersCustomer';
import { AppState } from '../../../redux/store';
import { Formik } from 'formik';


const title = "Home Screen"


interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    orders: IOrderItem[];
    takeTotalAmount: number;
    tookTotalAmount: number;
    restTotalAmount: number;
    isOrderLoading: boolean;
    loadingMore: boolean;
    isSuccess :boolean;
    GetOrders: (customerId: number, pageIndex: number, pageSize: number) => void;
    GetOrdersMore: (customerId: number, pageIndex: number, pageSize: number) => void;
    AddCash: (orderId: number, amount: string) => void;
    orderDelete: (orderId: number) => void;
    RbSheet: RBSheet;
  }
  

  interface amountData {
    amount: string
  }
  
  interface State {
    refreshing: boolean;
    modalVisible: boolean;
    orderId: number;
    amount: number;
    modalAmountVisible: boolean;
    modalPriceVisible: boolean;
    unitPrice: number;
    count: number;
    productId: number;
    productName: string;
    page: number;
    isPaid:boolean;
  }
  
const girdiler = Yup.object().shape({

});

const initialValues: amountData = {
  amount: "",
}



class EmployeeScreen extends Component<Props,State>{

    componentWillMount() {


      }

      static navigationOptions = ({navigation}) => ({
        title: 'Çalışanlar',
       
    })



    OrderSheet: any;
    CustomerSheet: any;
    AmountSheet: any;
  
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
        isPaid:false,
      };
    }



      renderSeparator = () => (
        <View style={{ width: '100%', height: 1, backgroundColor: '#CFD3D7'}} />
            
      );

   

      _renderView() {
        const { orders, isOrderLoading, navigation } = this.props;
        if (isOrderLoading) {
          return (<ActivityIndicator></ActivityIndicator>);
        }
        else {
          return (<FlatList
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
            data={this.props.orders}
            ItemSeparatorComponent = {this.renderSeparator}

            
            renderItem={({ item }) =>
              
        
<View style={{marginHorizontal:0,flexDirection:'column',backgroundColor:'#EFF3F9',paddingVertical:10,paddingHorizontal:10,justifyContent:'space-between',borderRadius:15}}>
            
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
 
            <View style={{justifyContent:'center'}}>
                 
                 <Text style={{color:'#2069F3',fontWeight:'600',fontSize:20,fontFamily:'Avenir Next'}}>

                        {item.productName}
                 </Text>
             </View>
             {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}
             <View style={{alignItems:'flex-end'}}>
               <TouchableOpacity onPress={() => this.openModal(item.orderId, item.unitPrice, item.count, item.productId, item.productName,item.isPaid)}>
                 <Icon style={{color:"#2069F3"}} name="ios-more" />
               </TouchableOpacity>
                 <Text style={{color:'#404243',fontSize:14,fontFamily:'Avenir Next'}}>
                 {item.dateTime.slice(8, 10) + "/" + item.dateTime.slice(5, 7) + "/" + item.dateTime.slice(0, 4)
                  }
                 </Text> 
                 <Text style={{color:'#404243',fontSize:14,fontFamily:'Avenir Next'}}>
                    {item.dateTime.slice(11, 16)}
                 </Text>
                 </View>
             
             
              </View>
 
 
              <View style={{width:"100%",height:1,backgroundColor:'#CFD3D7',marginVertical:10}} />
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <View>
                 <View style={{flexDirection:'row'}}>
                 <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                     Adet: 
                 </Text>
                 <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                     {item.count}
                 </Text>
 
                 </View>
 
                 <View style={{flexDirection:'row'}}>
                 <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                     Birim Fiyat: 
                 </Text>
                 <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                     {item.unitPrice} TL
                 </Text>
 
                 </View>
 
                 <View style={{flexDirection:'row'}}>
                 <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                     Toplam Fiyat: 
                 </Text>
                 <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    {item.totalPrice} TL
                 </Text>
 
                 </View>
 
 
               
             </View>
             {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}
 
             <View>
             <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                 <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                     Alınan: 
                 </Text>
                 <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                     {item.tookTotalPrice} TL
                 </Text>
 
                 </View>
                 <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                 <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next',textAlign:"right"}}>
                     Kalan: 
                 </Text>
                 <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    {item.tookTotalPrice} TL
                 </Text>
 
                 </View>
 
 
             </View>
             </View>
            </View>
 
 
 
 
        }
            keyExtractor={(item, index) => String(index)}
            onEndReached={() => {
              var pagenew = this.state.page + 1;
              this.setState({ page: pagenew });
              if (pagenew == 1) {
                pagenew = pagenew + 1;
                this.setState({ page: pagenew });
              }
              this.props.GetOrdersMore(this.props.navigation.getParam("customerId"), pagenew, 3);
    
            }}
            onEndReachedThreshold={0.5}
            initialNumToRender={8}
            ListFooterComponent={
              this.props.loadingMore ? (
                <View>
                  <ActivityIndicator />
                </View>
              ) : null
            }
          />);
        }
      }


      renderEmployeeItem(item : any) {
          return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Customer", { customerId: item.customerId, nameSurname: item.nameSurname, companyName: item.companyName, displayTookTotalAmount: item.displayTookTotalAmount, restTotalAmount: item.displayRestTotalAmount, totalAmount: item.displayTotalAmount })} style={{ marginHorizontal: 5, flexDirection: 'row', paddingVertical: 20, paddingHorizontal: 5, borderRadius: 15 }}>
            <View style={{ width: 39, height: 39, borderRadius: 18.5, backgroundColor: '#2069F3', justifyContent: 'center', alignItems: 'center' ,alignSelf:'center'}}>
                <Text style={{ color: 'white'}}>A</Text>
            </View>
            <View style={{flex:.7,marginLeft:20,justifyContent:'center'}}>
            <View style={{justifyContent:'center'}}>
                
                <Text style={{ color: '#2069F3', fontWeight: '600', fontSize: 18, fontFamily: 'Avenir Next' }}>
                    Ali
                </Text>
            </View>
            <View style={{justifyContent:'center'}}>
                
                <Text style={{ fontSize: 12, fontFamily: 'Avenir Next' }}>
                    İşe Giriş Tarihi : 20/12/2018
                </Text>
            </View>

            </View>

            
          

            <View style={{flex:.3,alignItems:'flex-end',marginRight:10}}>
            <TouchableOpacity>
            <Icon style={{color:"#2069F3"}} name="ios-more" />
            </TouchableOpacity>
                <Text style={{ color: '#404243', fontSize: 14, fontFamily: 'Avenir Next' }}>
                    Maaş
                </Text>
                <Text style={{ color: '#2069F3', fontWeight: '600', fontSize: 16, fontFamily: 'Avenir Next' }}>
                    2500 TL
                </Text>
            </View>
        </TouchableOpacity>
          )
      }

      
    render() {

        // var nameSurname: string = this.props.navigation.getParam("nameSurname");
        // var companyName: string = this.props.navigation.getParam("companyName");

        // var restTotalAmount : string = this.props.navigation.getParam("restTotalAmount");
        // var displayTookTotalAmount : string = this.props.navigation.getParam("displayTookTotalAmount");
        // var totalAmount : string = this.props.navigation.getParam("totalAmount");
        return (
            <View style={{flex:1}}>
             {this.renderEmployeeItem(null)}
             {this.renderSeparator()}
             {this.renderEmployeeItem(null)}
             {this.renderSeparator()}
             {this.renderEmployeeItem(null)}
             {this.renderSeparator()}
             {this.renderEmployeeItem(null)}

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
  


export default connect(
    // mapStateToProps,
    // bindToAction
  )(EmployeeScreen);




