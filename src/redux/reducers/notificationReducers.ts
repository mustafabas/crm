import { NOTIFICATION_LIST_LOADING, NOTIFICATION_LIST_FAILED, NOTIFICATION_LIST_GET,RESET_PROPS } from "../types";
import {Action} from '../states';

import {notificationListItem, INotificationItem} from '../actions/notificationAction'

const intialState = {
    isLoading : false,
    message:"",
    notificationListItem :{} as  INotificationItem[]
};

export interface notificationState {
    isLoading: boolean;
    message: string;
    notificationListItem: INotificationItem[];
  }



export default (state: notificationState = intialState, action: Action) => {
  switch (action.type) {
    case NOTIFICATION_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
        message :action.payload
      };
    case NOTIFICATION_LIST_GET:
        return {
          ...state,
          isLoading:false,
          loginErrorMessage: '',
          notificationListItem : action.payload
        };
    case NOTIFICATION_LIST_FAILED:
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
