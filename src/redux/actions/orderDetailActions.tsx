import axios from 'axios'
import {WATER_GET_NOTIFICATIONS, WATER_GET_CUSTOMER_ORDER_DETAIL} from './../constants'
import { Dispatch } from "react";
import { GET_CUSTOMER_ORDER_DETAIL, GET_CUSTOMER_ORDER_DETAIL_LOADING, GET_CUSTOMER_ORDER_DETAIL_FAILED} from './../types'
import {Action} from '../states'

import {AsyncStorage } from 'react-native'


import { navigate } from '../services/Navigator';
import { reset} from './loginAction';
import { addOrder } from './addOrderAction';

export enum OrderStatus
    {
        Waiting = 1,
        Exported =2,
        Cannceled = 3
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

        }else {
            dispatch(isLoading(false,"Sipariş listelenirken bir hata oluştu."))
            dispatch(reset())
        }
      })
      .catch(error => {   
        dispatch(addOrder(false,"Sipariş listelenirken bir hata oluştu."));
        dispatch(reset())
      });
  
    }).catch(err=> {
      dispatch(addOrder(false,"Sipariş listelenirken bir hata oluştu."));
      dispatch(reset())
    })
    
  
    }
  
  }





export const isLoading = (loading : boolean,message : string) => ({
  type : GET_CUSTOMER_ORDER_DETAIL_LOADING ? GET_CUSTOMER_ORDER_DETAIL_LOADING : GET_CUSTOMER_ORDER_DETAIL_FAILED,
  payload: message
})


export const getDetail = (orderDetail : orderDetail) => ({
    type : GET_CUSTOMER_ORDER_DETAIL,
    payload : orderDetail
})