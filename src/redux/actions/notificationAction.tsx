import axios from 'axios'
import {WATER_GET_NOTIFICATIONS} from './../constants'
import { Dispatch } from "react";
<<<<<<< HEAD
import { NOTIFICATION_LIST_LOADING, NOTIFICATION_LIST_FAILED, NOTIFICATION_LIST_GET, NOTIFICATION_COUNT_LOADING, NOTIFICATION_COUNT_FAILED, NOTIFICATION_COUNT_GET, NOTIFICATION_LIST_GET_MORE, NOTIFICATION_LIST_LOADING_MORE } from './../types'
import { Action } from '../states'
=======
import {NOTIFICATION_LIST_LOADING, NOTIFICATION_LIST_FAILED, NOTIFICATION_LIST_GET} from './../types'
import {Action} from '../states'
>>>>>>> s

import {AsyncStorage } from 'react-native'


import { navigate } from '../services/Navigator';
import { reset} from './loginAction';
import { addOrder } from './addOrderAction';

export interface notificationListItem {
    notificationId : number;
    message : string;
    type : number;
    orderId : number;
    createdDate : string;
}

export interface INotificationItem {
  key : string;
  value : notificationListItem;
}


export function getNotifications() {
    return (dispatch : Any) =>  {
        dispatch(isLoading(true,''))
      AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
        let token = res[0][1];
        let userId = res[1][1];
        
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      axios.get(WATER_GET_NOTIFICATIONS +`?userId=${userId}&page=1&pageSize=15`,{
          headers : headers
        }).then((response) =>{
          
        var notificationList : INotificationItem[] = []

          var count = 0
      if(response.data.isSuccess){
         response.data.result.forEach(element => {
           var notificationItem ={} as notificationListItem;
           notificationItem.notificationId = element.notificationId,
           notificationItem.message =element.message,
           notificationItem.type = element.type,
           notificationItem.orderId = element.orderId,
           notificationItem.createdDate = element.createdDate
           
            notificationList.push({
                key : count.toString(),
                value : notificationItem
            })
            
            count ++ ;
     
         });
         dispatch(notification(notificationList))

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
  type : NOTIFICATION_LIST_LOADING ? NOTIFICATION_LIST_LOADING : NOTIFICATION_LIST_FAILED,
  payload: message
})


export const notification = (notificationList : INotificationItem[]) => ({
    type : NOTIFICATION_LIST_GET,
    payload : notificationList
})