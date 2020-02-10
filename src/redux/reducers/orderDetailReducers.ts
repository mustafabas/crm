import { NOTIFICATION_LIST_LOADING, NOTIFICATION_LIST_FAILED, NOTIFICATION_LIST_GET,RESET_PROPS, GET_CUSTOMER_ORDER_DETAIL_LOADING, GET_CUSTOMER_ORDER_DETAIL, GET_CUSTOMER_ORDER_DETAIL_FAILED } from "../types";
import {Action} from '../states';

import {notificationListItem, INotificationItem} from '../actions/notificationAction'
import { orderDetail } from "../actions/orderDetailActions";

const intialState = {
    isLoading : false || null,
    message:"",
    orderDetail : {} as  orderDetail
};

export interface orderDetailState {
    isLoading: boolean | null;
    message: string;
    orderDetail: orderDetail;
  }



export default (state: orderDetailState = intialState, action: Action) => {
  switch (action.type) {
    case GET_CUSTOMER_ORDER_DETAIL_LOADING:
      return {
        ...state,
        isLoading: true,
        message :action.payload
      };
    case GET_CUSTOMER_ORDER_DETAIL:
        return {
          ...state,
          isLoading:false,
          loginErrorMessage: '',
          orderDetail : action.payload
        };
    case GET_CUSTOMER_ORDER_DETAIL_FAILED:
        return {
            ...state,
              isLoading:false,
              message:action.payload
            };
    case RESET_PROPS :
        return {
          ...state,
          isLoading:false,
          message : ""
        };
    default:
      return state ;

  }
};
