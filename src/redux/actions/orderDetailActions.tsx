import axios from 'axios'
import {WATER_GET_NOTIFICATIONS, WATER_GET_CUSTOMER_ORDER_DETAIL,WATER_UPDATE_CUSTOMER_ORDER_STATUS, WATER_ADD_ORDER, WATER_GET_ORDER_LIST} from './../constants'
import { Dispatch } from "react";
import { GET_CUSTOMER_ORDER_DETAIL, GET_CUSTOMER_ORDER_DETAIL_LOADING, GET_CUSTOMER_ORDER_DETAIL_FAILED, UPDATE_ORDER_DETAIL, UPDATE_ORDER_DETAIL_LOADING, UPDATE_ORDER_DETAIL_FAILED, GET_CUSTOMER_ORDER_LIST_LOADING, GET_CUSTOMER_ORDER_LIST_FAILED, GET_CUSTOMER_ORDER_LIST} from './../types'
import {Action} from '../states'

import {AsyncStorage } from 'react-native'


import { navigate } from '../services/Navigator';
import { reset} from './loginAction';
import { addOrder } from './addOrderAction';
import { getNotifications } from './notificationAction';

export enum OrderStatus
    {
        null = "0" ,
        Waiting = "1",
        Exported ="2",
        Cannceled = "3"
    }
export interface orderDetail {
    orderId: number;
    displayTotalPrice: string;
    displayUnitPrice: string;
    count: string;
    customerName: string;
    customerAddress:string;
    customerPhoneNumber: string;
    transportationUserName: string;
    orderStatusText: string;
    productName: string;
    companyName: string;
    createdDate: string;
    orderStatus: OrderStatus;
  }


      








export function updateCustomerOrderStatus(orderStatus : OrderStatus, orderId : number) {
  return (dispatch : Any) =>  {
    dispatch(isLoadingStatusUpdate(true,''))
  AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
    let token = res[0][1];
    let userId = res[1][1];
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  }
  axios.post(WATER_UPDATE_CUSTOMER_ORDER_STATUS,{
    orderStatus: orderStatus,
    orderId: orderId
  },{
      headers : headers
    }).then((response) =>{
      
  if(response.data.isSuccess){
    

     dispatch(updateOrderStatus("Sipariş Durumunuz Güncellendi."))
     dispatch(reset())
     dispatch(getCustomerOrderDetail(orderId))
     dispatch(getCustomerOrders())

    }else {
        dispatch(isLoadingStatusUpdate(false,"Sipariş durumunuz güncellenemedi daha sonra tekrar deneyim."))
        dispatch(reset())
    }
  })
  .catch(error => {   
    dispatch(isLoadingStatusUpdate(false,"Sipariş durumunuz güncellenemedi daha sonra tekrar deneyim."))
    dispatch(reset())
  });

}).catch(err=> {
  dispatch(isLoadingStatusUpdate(false,"Sipariş durumunuz güncellenemedi daha sonra tekrar deneyim."))
  dispatch(reset())
})


}

}



export function getCustomerOrderDetail(orderId : number) {
    return (dispatch : Any) =>  {
        dispatch(isLoading(true,''))
      AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
        let token = res[0][1];
        let userId = res[1][1];
        
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      axios.get(WATER_GET_CUSTOMER_ORDER_DETAIL +`?orderId=${orderId}`,{
          headers : headers
        }).then((response) =>{
          
        var orderDetail = {} as orderDetail

          var count = 0
      if(response.data.isSuccess){
         let data = response.data.result
         orderDetail.companyName = data.companyName;
         orderDetail.count = data.count;
         orderDetail.createdDate = data.createdDate;
         orderDetail.customerAddress = data.customerAddress;
         orderDetail.customerName = data.customerName;
         orderDetail.customerPhoneNumber = data.customerPhoneNumber;
         orderDetail.displayTotalPrice = data.displayTotalPrice;
        orderDetail.displayUnitPrice = data.displayUnitPrice;
        orderDetail.orderId = data.orderId;
        orderDetail.orderStatus = data.orderStatus;
        orderDetail.orderStatusText = data.orderStatusText;
        orderDetail.productName = data.productName;
        orderDetail.transportationUserName = data.transportationUserName;

         dispatch(getDetail(orderDetail))
         dispatch(reset())
        }else {
            dispatch(isLoading(false,"Sipariş listelenirken bir hata oluştu."))
            dispatch(reset())
        }
      })
      .catch(error => {   
        dispatch(isLoading(false,"Sipariş listelenirken bir hata oluştu."))
        dispatch(reset())
      });
  
    }).catch(err=> {
      dispatch(isLoading(false,"Sipariş listelenirken bir hata oluştu."))
      dispatch(reset())
    })
    
  
    }
  
  }

  export interface orderListItem {

    orderId: number;
    displayTotalPrice: string;
    displayUnitPrice: string;
    count: string;
    customerName: string;
    transportationUserName: string;
    orderStatusText: string;
    productName: string;
    companyName: string;
    createdDate: string;
    orderStatus: OrderStatus;
  }




  export function getCustomerOrders() {
    return (dispatch : Any) =>  {
        dispatch(isLoadingOrderList(true,''))
      AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
        let token = res[0][1];
        let userId = res[1][1];
        
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      console.log(userId)
      axios.get(WATER_GET_ORDER_LIST + `?userId=${userId}&page=1&pageSize=20&`,{
          headers : headers
        }).then((response) =>{
          
        var orderList : orderListItem[] = [] 


      if(response.data.isSuccess){
        console.log(response.data.result)
        response.data.result.forEach(element  => {
          orderList.push({
          
    orderId: element.orderId,
    displayTotalPrice: element.displayTotalPrice,
    displayUnitPrice: element.displayUnitPrice,
    count: element.count,
    customerName: element.customerName,
    transportationUserName: element.transportationUserName,
    orderStatusText: element.orderStatusText,
    productName: element.productName,
    companyName: element.companyName,
    createdDate: element.createdDate,
    orderStatus: element.orderStatus,
          })
        });

         dispatch(getOrderList(orderList))
         dispatch(reset())
        }else {
            dispatch(isLoadingOrderList(false,"Sipariş listelenirken bir hata oluştu."))
            dispatch(reset())
        }
      })
      .catch(error => {   
        dispatch(isLoadingOrderList(false,"Sipariş listelenirken bir hata oluştu."))
        dispatch(reset())
      });
  
    }).catch(err=> {
      dispatch(isLoadingOrderList(false,"Sipariş listelenirken bir hata oluştu."))
      dispatch(reset())
    })
    
  
    }
  
  }




export const isLoadingOrderList = (loading : boolean, message : string) => ({
  type : loading  ? GET_CUSTOMER_ORDER_LIST_LOADING : GET_CUSTOMER_ORDER_LIST_FAILED,
  payload : message
})

export const getOrderList = (orderList : orderListItem[]) => ({
  type : GET_CUSTOMER_ORDER_LIST,
  payload : orderList
})


export const isLoading = (loading : boolean,message : string) => ({
  type : GET_CUSTOMER_ORDER_DETAIL_LOADING ? GET_CUSTOMER_ORDER_DETAIL_LOADING : GET_CUSTOMER_ORDER_DETAIL_FAILED,
  payload: message
})


export const getDetail = (orderDetail : orderDetail) => ({
    type : GET_CUSTOMER_ORDER_DETAIL,
    payload : orderDetail
})


export const isLoadingStatusUpdate  = (loading : boolean, message : string ) => ({ 
  type : loading ? UPDATE_ORDER_DETAIL_LOADING : UPDATE_ORDER_DETAIL_FAILED,
  paylaod : message
})

export const updateOrderStatus = (message : string) => ({
  type : UPDATE_ORDER_DETAIL,
  payload : message
})