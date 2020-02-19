import axios from 'axios'
import {WATER_ADD_ORDER} from './../constants'
import { Dispatch } from "react";
import {ADD_ORDER_SUCCEED,ADD_ORDER_FAILED, ADD_ORDER_IS_LOADING, GET_EMPLOYEE_TOKENS} from './../types'
import {Action} from '../states'

import {AsyncStorage } from 'react-native'

import { GetOrders, GetCustomerDetail } from './orderAction';
import { navigate } from '../services/Navigator';
import { reset, loading } from './loginAction';
import { getCustomerOrders } from './orderDetailActions';


export function chooseEmployee(userId : string) {


}
export interface userWithToken {
  id : number;
  name : string;
  tokens : string[];
}


export interface notificationEmployee  {
  orderId : number;
  userWithToken : userWithToken[];

}







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


          let data = response.data.result.userWithTokenItemResponses;
          var notificationItemList: { id: any; name: any; tokens: any; }[]  = []
          data.forEach(((element:any) => {

            notificationItemList.push({id : element.id,name:element.name , tokens : element.tokens})
            
            
          }));
          var notificationEmployee = {} as notificationEmployee;
          notificationEmployee.userWithToken = notificationItemList;
          notificationEmployee.orderId = response.data.result.orderId;
          dispatch(getEmployeeList(notificationEmployee));

          dispatch(addOrder(true, "Sipariş Alındı!"));
          dispatch(reset())
          dispatch(GetOrders(customerId, 1, 10))
          dispatch(GetCustomerDetail(customerId));
          dispatch(getCustomerOrders())
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
  



  export const getEmployeeList = (notificationEmployee : notificationEmployee) => ({
    type : GET_EMPLOYEE_TOKENS,
    payload : notificationEmployee
  })