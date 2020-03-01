import React, { Component } from "react";
import {
    View,

    KeyboardAvoidingView,
    ScrollView,
    Platform, TouchableOpacity, Text,Image, StatusBar, StyleSheet, Switch,FlatList, AsyncStorage, ActivityIndicator, RefreshControl
} from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import {Icon} from 'native-base'

import { Formik } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";
import { AppState } from '../../../redux/store'
import { OrderStatus, orderListItem,getCustomerOrders, updateCustomerOrderStatus } from "../../../redux/actions/orderDetailActions";
import { InfoItem } from '../../../components/InfoItem';
import RBSheet from "react-native-raw-bottom-sheet";
import { showMessage } from "react-native-flash-message";


interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    message : string;
    orderList : orderListItem[];
    loading : boolean | null;
    getCustomerOrders : (page? : number) => void;
    page : number;
    updateCustomerOrderStatus : (orderStatus : OrderStatus , orderId : number) => void;
    orderStatusMessage : string;
    // isTriedOrderStatus:boolean;

}

interface State {
    userId : string;
    orderStatus : OrderStatus;
    page : number;
    orderStatusString : String[];
    selectedOrderId : number;
    item : orderListItem;
    

}



class OrderListScreen extends Component<Props, State> {
    
    constructor(props) {
        super(props);
        this.state = {
          userId : "",
          page : 0,
          orderStatus : OrderStatus.null,
      orderStatusString : ["Sipariş Durumu Yok",
      "Sipariş Beklemede",
      "Sipariş Tamamlandı",
       "Sipariş İptal Edildi"],
       selectedOrderId:0
       ,item : {} as  orderListItem

        };
      }



    static navigationOptions = {
        title: 'Siparişlerim',

    };

    renderStatusbarOnlyIOS() {
        



    }

    showSimpleMessage() {
        if (this.props.orderStatusMessage) {
    
            showMessage({
                message: this.props.orderStatusMessage,
                type:  "info",
                icon: "auto"
            }
            );
        }

    
    }
    

    renderItem(item : orderListItem) {
        var color = "red"
        var colorInBasket  = "#f25f5f"
        var colorMoneyApproved = "#cad161"
        var colorCompleted = "#659b7c"
        var colorWaitingForMoney = "#b38100"
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

        <TouchableOpacity onPress={()=>         this.props.navigation.navigate('OrderDetail',{orderId : item.orderId})} style={[styles.inputContainer, { paddingVertical: '5%',paddingHorizontal:'3%',justifyContent:'flex-start',  }]}>


        <View style={{ flex:1}}>

                {/* <Text style={{ borderWidth: 1, borderRadius: 5, padding: 7, borderColor: '#c58585', marginRight: 50,textAlign:'center' }}>S.No : {item.orderId}</Text> */}
        {/* asda */}
            <View style={{flexDirection:'row'}}>
            <Text  style={{flex:1,fontFamily:'Avenir Next',color:'#2069F3',fontSize:16,fontWeight:"600"}}>
                    {item.companyName ? item.companyName : item.customerName}
                </Text>

                {/* <Text  style={{textAlign:'right',flex:.4,fontFamily:'Avenir Next'}}>
                    {item.productName}
                </Text> */}

                <TouchableOpacity onPress={() => {
                    this.setState({orderStatus : item.orderStatus,selectedOrderId : item.orderId,item : item} , () => this.changeOrderStatus.open())
                }}>
                    <Icon name="ios-more" />
                </TouchableOpacity>


            </View>

            <View style={{flexDirection:'row',marginTop:15,}}>
            <Text style={{ color: '#727272',flex:.6,fontFamily:'Avenir Next'}}>
                     {item.createdDate}
        </Text>

                

                <View style={{ flexDirection: 'row',flex:.4,justifyContent:'flex-end'}}>
                        <Text style={{ color: '#767676',fontFamily:'Avenir Next' }}>
                            Adet: 
        </Text>
                        <Text style={{ marginLeft:5,fontFamily:'Avenir Next'}}>
                            {item.count}
        </Text>
                    </View>

            </View>


            <View style={{flexDirection:'row',marginTop:15,}}>
            

        <Text style={{  color: color,textAlign:'left',fontFamily:'Avenir Next',flex:.6 }}>
                        {textSecond}
        </Text>

        <View style={{ flexDirection: 'row',justifyContent:'flex-end',flex:.4}}>
                        <Text style={{ color: '#767676' ,fontFamily:'Avenir Next'}}>
                            Birim:
        </Text>
                        <Text style={{ marginLeft:5,fontFamily:'Avenir Next' }}>
                            {item.displayUnitPrice}
        </Text>
                    </View>

            </View>

            <View style={{ flexDirection: 'row',marginTop:15,justifyContent:'flex-end'}}>
                        <Text style={{ color: '#767676' ,fontFamily:'Avenir Next'}}>
                            Toplam: 
        </Text>
                        <Text style={{ marginLeft:5,fontFamily:'Avenir Next'}}>
                            {item.displayTotalPrice}
        </Text>
                    </View>


       {/* -------------asd */}
                {/* <View >


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
                 {/* */} 
                
                
                {/* <TouchableOpacity disabled={moneyIsTaken}
                //  onPress={()=> this.props.navigation.navigate('CreditCart', {basketId: basketId, userId:userId})} 
                  style={{ borderBottomColor: 'red', borderBottomWidth: moneyIsTaken ? 0 : 1, alignItems: 'center', marginHorizontal: 45 }}>
                    <Text style={{ marginTop: 20 }}>
                       {moneyIsTaken ? "" : "Tekrar Öde"}
                    </Text>
                </TouchableOpacity> */}

            {/* <View style={{ backgroundColor: '#ababab', height: '50%', width: .5, alignSelf: 'flex-end' }}>
        
            </View> */}
            
            {/* <View style={{marginTop:5}} >

               

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
            {/* </View> */}
            
            
        {/* </View> */} 
        
        {/*   asdasdas */}
        
        
        
        {/* asdasd */}
        
        
        
        
        
        
        
        
        </TouchableOpacity>
        
        )
    }
    refreshController(){
        this.setState({refreshing : true,page: 1 })
        this.props.getCustomerOrders()

    }

    changeOrderStatusContent() {
    
        return(
          <View>
            <TouchableOpacity onPress={()=> this.changeOrderStatus.close()}
             style={{position:'absolute',right:0,zIndex:20}}>
              <Icon name="ios-close" style={{fontSize:35}}/>
            </TouchableOpacity>
            <View style={{marginTop:5}}>
              <Text style={{fontFamily:'Avenir Next',textAlign:'center',fontSize:18,fontWeight:'600'}}>Sipariş Durumunu Güncelle</Text>
              <TouchableOpacity onPress={()=> this.setState({orderStatus : OrderStatus.Waiting})}
            style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#cbd25f',backgroundColor:this.state.orderStatus === OrderStatus.Waiting ? '#cbd25f' : 'white'}}>
     <Text style={{fontFamily:'Avenir Next',fontSize:16,paddingVertical:5,textAlign:'center',color:this.state.orderStatus === OrderStatus.Waiting ? 'white' :'black'}}>
        Sipariş Beklemede
     
     </Text>
     </TouchableOpacity>
    
     <TouchableOpacity onPress={()=> this.setState({orderStatus : OrderStatus.Exported})}
            style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#0f5f00',backgroundColor: this.state.orderStatus === OrderStatus.Exported ? '#0f5f00' : 'white'}}>
     <Text style={{fontFamily:'Avenir Next',fontSize:16,paddingVertical:5,textAlign:'center',color:this.state.orderStatus === OrderStatus.Exported ? 'white' :'black'}}>
        Siparişi Tamamla
     
     </Text>
     </TouchableOpacity>
    
     <TouchableOpacity onPress={()=> this.setState({orderStatus : OrderStatus.Cannceled})}
            style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#bc0606',backgroundColor: this.state.orderStatus === OrderStatus.Cannceled ? '#bc0606' : 'white'}}>
     <Text style={{fontFamily:'Avenir Next',fontSize:16,paddingVertical:5,textAlign:'center',color:this.state.orderStatus === OrderStatus.Cannceled ? 'white' :'black'}}>
        Siparişi İptal Et
     
     </Text>
     </TouchableOpacity>
    
     <TouchableOpacity onPress={
    
    
    
    
       () => { this.changeOrderStatus.close();
         this.props.updateCustomerOrderStatus(this.state.orderStatus,this.state.selectedOrderId)}
    
     }
      disabled={this.state.orderStatus === OrderStatus.null || this.state.item.orderStatus === this.state.orderStatus}
            style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#216AF4',backgroundColor: '#216AF4', opacity : this.state.orderStatus === OrderStatus.null || this.state.item.orderStatus === this.state.orderStatus ? .3 : 1}}>
     <Text style={{fontFamily:'Avenir Next',fontSize:16,paddingVertical:5,textAlign:'center',color:'white'}}>
        Onayla
     
     </Text>
     </TouchableOpacity>
    
            </View>
          </View>
        )
    
      }


    renderList(){
        if(this.props.loading === false && this.state.refreshing) {
            this.setState({refreshing : false})
        }
        if(this.props.loading && this.props.orderList.length < 1) {
            return (
                <ActivityIndicator style={{flex:1}} />
            )
        }
        
        else if (this.props.loading === false && this.props.orderList.length  < 1){
            return(
                <View style={{flex:1,justifyContent:'center'}}>
                    <InfoItem text="Siparişiniz Bulunmamaktadır." />

                    </View>


            )
        }else {
            return(
                <FlatList
        // contentContainerStyle={{margin:10}}
//  style={{flex:1}}
        refreshControl={
            <RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={this.props.loading && this.state.refreshing}
                onRefresh={()=> this.refreshController()}
            />
        }
        style={{paddingTop:20}}
        data={this.props.orderList}
        extraData ={this.props.orderList}
        // style={{flexGrow:0}}
        // keyExtractor={item => item.basketId.toString()}
        renderItem={({ item }) => {

              return this.renderItem( item );


            }}
            
            onEndReached={() => {


              if(this.props.orderList && this.props.orderList.length > 14){
                var pagenew = this.state.page + 1;
                this.setState({ page: pagenew });
                if (pagenew == 1) {
                  pagenew = pagenew + 1;
                  this.setState({ page: pagenew });
                }
                this.props.getCustomerOrders(pagenew);
              
              }
            
            }
        }

              onEndReachedThreshold={0.5}
              initialNumToRender={5}
              ListFooterComponent={
                this.props.loading ? (
                  <View>
                    <ActivityIndicator />
                  </View>
                ) : null
              }
            



        

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
                <RBSheet
          ref={ref => {
            this.changeOrderStatus = ref;
          }}
          height={400}
          duration={200}
          customStyles={{
            container: {
                borderRadius:5,

                padding:20
            }
          }}
        >
          {this.changeOrderStatusContent()}
        </RBSheet>
        {this.showSimpleMessage()}
               
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
        backgroundColor:"#EFF3F9",
        shadowColor: '#EFF3F9',
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
    message : state.orderDetail.messageOrderList,
    orderStatusMessage : state.orderDetail.orderStatusMessage,

  })
  
  function bindToAction(dispatch : any) {
    return {
        getCustomerOrders : (page? : number) => 
        dispatch(getCustomerOrders(page)),
        updateCustomerOrderStatus : (orderStatus : OrderStatus , orderId : number) =>
        dispatch(updateCustomerOrderStatus(orderStatus,orderId))
    };
  
  }
  

export default connect(mapStateToProps,bindToAction)(OrderListScreen)
