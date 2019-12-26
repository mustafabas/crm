import axios from 'axios'
import {WATER_ADD_ORDER} from './../constants'
import { Dispatch } from "react";
import {ADD_ORDER_SUCCEED,ADD_ORDER_FAILED, ADD_ORDER_IS_LOADING} from './../types'
import {Action} from '../states'
import { AsyncStorage } from 'react-native';
import { GetOrders } from './orderAction';
import { navigate } from '../services/Navigator';
import { reset, loading } from './loginAction';


export function AddOrder(productId:number, customerId:number,unitPrice:number, count:number,isPaid:boolean) {
  return (dispatch : Any) =>  {

dispatch(isLoading(true))
    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    axios.post(WATER_ADD_ORDER,
      {
          productId: productId,
          customerId: customerId,
          unitPrice: unitPrice,
          count: count,
          isPaid:isPaid,
          userId : userId
          
      },{
        headers : headers
      })
    .then((response) =>{
    if(response.data.isSuccess){
        if(response.data.result){
          dispatch(addOrder(true, "Sipariş Alındı!"));
          dispatch(reset())
          dispatch(GetOrders(customerId, 1, 10))

        }
      }
    })
    .catch(error => {   
      dispatch(addOrder(false,"Sipariş eklenirken bir hata oluştu."));
      dispatch(reset())
    });

  }).catch(err=> {
    dispatch(addOrder(false,"Bir Hata Meydana Geldi."));
    dispatch(reset())
  })
  

  }

}

export const isLoading = (loading : boolean) => ({
  type : ADD_ORDER_IS_LOADING,
  payload: loading
})

  
  export const addOrder = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? ADD_ORDER_SUCCEED : ADD_ORDER_FAILED,
    payload : message
  })
  