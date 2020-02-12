import React, { Component } from "react";
import {
    View,

    KeyboardAvoidingView,
    ScrollView,
    Platform, TouchableOpacity, Text,Image, StatusBar, StyleSheet, Switch,FlatList, AsyncStorage, ActivityIndicator
} from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import {Icon} from 'native-base'

import { Formik } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import { OrderStatus, orderListItem,getCustomerOrders } from "../../../redux/actions/orderDetailActions";



interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    message : string;
    orderList : orderListItem[];
    loading : boolean | null;
    getCustomerOrders : () => void;

    // isTriedOrderStatus:boolean;

}




class OrderListScreen extends Component<Props, {}> {
    
    constructor(props) {
        super(props);
        this.state = {
          userId : ""
    
        };
      }



    static navigationOptions = {
        title: 'Siparişlerim',

    };

    renderStatusbarOnlyIOS() {



    }
    renderItem(item : orderListItem) {
        var color = "red"
        var colorInBasket  = "#f25f5f"
        var colorMoneyApproved = "#659b7c"
        var colorCompleted = "#659b7c"
        var colorWaitingForMoney = "#bbc276"
        var textFirst = ""
        var textSecond = ""
        var moneyIsTaken = false
        var basketId = item.orderId
        var userId = this.state.userId
        if(item.orderStatus === OrderStatus.Exported) {
            color = colorCompleted
            textSecond = "Başarılı"
            moneyIsTaken = true
        }   
        else if(item.orderStatus === OrderStatus.Waiting) {
            color = colorMoneyApproved
            textSecond = "Beklemede"
            moneyIsTaken = true
        }
        else if (item.orderStatus === OrderStatus.Cannceled) {
            color = colorWaitingForMoney
            textSecond = "İptal Edildi"
            moneyIsTaken = true
                

    
           
        }

        else{
            color = colorInBasket
            textSecond = "Atama Yapilmadi"

        }
        

        return (

        <TouchableOpacity onPress={()=>         this.props.navigation.navigate('OrderDetail',{orderId : item.orderId})} style={[styles.inputContainer, { paddingVertical: '5%',paddingHorizontal:'3%',marginTop: 0,  justifyContent: 'flex-start', borderWidth: 1, borderColor: '#d3d3d3' }]}>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                {/* <Text style={{ borderWidth: 1, borderRadius: 5, padding: 7, borderColor: '#c58585', marginRight: 50,textAlign:'center' }}>S.No : {item.orderId}</Text> */}
        
                <View style={{}}>


                <Text  style={{marginTop:3}}>
                    {item.companyName ? item.companyName : item.customerName}
                </Text>
               
                <Text style={{ color: '#727272',marginTop:15}}>
                     {item.createdDate}
        </Text>

        <Text style={{  color: color,marginTop:15,textAlign:'left',fontWeight:'800',fontFamily:'Avenir Next' }}>
                        {textSecond}
        </Text>
        
               


                
                


                  
                    {/* <View style={{ marginTop: 30, marginLeft: '10%' }}>
                        <Text style={{ color: '#767676' }}>
                            Ödeme Tipi
                    </Text>
                        <Text style={{ marginTop: 10 }}>
                            {textFirst}
                    </Text>
        
                    </View>
         */}
                </View>
                {/* <TouchableOpacity disabled={moneyIsTaken}
                //  onPress={()=> this.props.navigation.navigate('CreditCart', {basketId: basketId, userId:userId})} 
                  style={{ borderBottomColor: 'red', borderBottomWidth: moneyIsTaken ? 0 : 1, alignItems: 'center', marginHorizontal: 45 }}>
                    <Text style={{ marginTop: 20 }}>
                       {moneyIsTaken ? "" : "Tekrar Öde"}
                    </Text>
                </TouchableOpacity> */}
            </View>
            {/* <View style={{ backgroundColor: '#ababab', height: '50%', width: .5, alignSelf: 'flex-end' }}>
        
            </View> */}
            
            <View style={{marginTop:5}} >

               

        <Text  style={{textAlign:'right'}}>
                    {item.productName}
                </Text>
        
        <View style={{ flexDirection: 'row',marginTop:15,justifyContent:'flex-end'}}>
                        <Text style={{ color: '#767676' }}>
                            Adet: 
        </Text>
                        <Text style={{ marginLeft:5}}>
                            {item.count}
        </Text>
                    </View>
                    <View style={{ flexDirection: 'row',marginTop: 15,justifyContent:'flex-end'}}>
                        <Text style={{ color: '#767676' }}>
                            Birim:
        </Text>
                        <Text style={{ marginLeft:5 }}>
                            {item.displayUnitPrice}
        </Text>
                    </View>

                    <View style={{ flexDirection: 'row',marginTop:15,justifyContent:'flex-end'}}>
                        <Text style={{ color: '#767676' }}>
                            Toplam: 
        </Text>
                        <Text style={{ marginLeft:5}}>
                            {item.displayTotalPrice}
        </Text>
                    </View>
{/*                 
                    <View style={{

                    // ,alignItems: 'center', marginTop: 20, borderRadius: 5, 
                    // shadowColor: color,
                    // shadowOffset: { width: 3, height: 3 },
                    // shadowOpacity: .5, marginHorizontal: 20

                }}> */}
                    
                {/* </View> */}
            </View>
            
            
        </View>
        
        {/*   asdasdas */}
        
        
        
        {/* asdasd */}
        
        
        
        
        
        
        
        
        </TouchableOpacity>
        
        )
    }

    renderList(){
        if(this.props.loading) {
            return (
                <ActivityIndicator style={{flex:1}} />
            )
        }
        
        else if (this.props.loading === false && this.props.orderList.length  < 1){
            return(
                <View style={[styles.inputContainer,{padding:20 ,backgroundColor:'#dcdca4',flexDirection:'row',justifyContent:'flex-start'}]}>
                    <Icon name="ios-alert" size={30} />
                    <Text style={{textAlign:'center',fontSize:16,fontFamily:'Roboto-Regular',marginLeft:20,marginTop:4}}>Siparişiniz Bulunmamaktadır.</Text>
                </View>
            )
        }else {
            return(
                <FlatList
        // contentContainerStyle={{margin:10}}
//  style={{flex:1}}
        style={{paddingTop:20}}
        data={this.props.orderList}
        extraData ={this.props.orderList}
        // style={{flexGrow:0}}
        // keyExtractor={item => item.basketId.toString()}
        renderItem={({ item }) => {

              return this.renderItem( item );


            }}



        

      />
            )
        }
        
    }

    componentWillMount() {
       this.props.getCustomerOrders()
       this.setState({userId :  AsyncStorage.getItem('userId')})
    }
    render() {
        return (
            <SafeAreaView style={[styles.container, {justifyContent:'flex-start' ,paddingTop:0}]} >

                {this.renderList()}

        
               
            </SafeAreaView>
        );
    }

}


const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 15

    },
    profileTextStyle: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: "300",
        fontFamily: 'Roboto-Regular',
        color: '#5e5e5e'
    },
    propsSeperator: {
        width: '90%',
        backgroundColor: '#b57b7b',
        height: .5,
        marginTop: 10,
        alignSelf: 'center'

    },container: {
        flex: 1,
        backgroundColor: "#e3e3e3",
        justifyContent: "center"
      },
      headStyle: {
        paddingVertical: 30,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
      },
      headText: {
        fontSize: 18,
        fontWeight: "700"
      },
      inputContainer: {
        justifyContent: "center",
        padding: 5,
        marginBottom:10,
        shadowColor: '#adadad',backgroundColor: 'white',
        marginLeft:10,marginRight:10,
        shadowOffset: {width: 3, height: 3 },
        shadowOpacity: .5,
        borderRadius: 5
      },
      signupLink: {
        flexDirection: "row",
        justifyContent: "center"
      },
      linkText: {
        color: "#3F51B5",
        fontWeight: "700"
      },forgotPassword:{
    
        color:'#c0c0c0',
    
        marginRight:15,
        fontFamily:'OpenSans-Regular'
        
    }
})




const mapStateToProps = (state : AppState) => ({
    orderList : state.orderDetail.orderList,
    loading : state.orderDetail.isLodingOrderList,
    message : state.orderDetail.messageOrderList
  })
  
  function bindToAction(dispatch : any) {
    return {
        getCustomerOrders : () => 
        dispatch(getCustomerOrders()),
    };
  
  }
  

export default connect(mapStateToProps,bindToAction)(OrderListScreen)
