import { NOTIFICATION_LIST_LOADING, NOTIFICATION_LIST_FAILED, NOTIFICATION_LIST_GET, RESET_PROPS, NOTIFICATION_COUNT_FAILED, NOTIFICATION_COUNT_LOADING, NOTIFICATION_COUNT_GET } from "../types";
import { Action } from '../states';

import { notificationListItem, INotificationItem } from '../actions/notificationAction'

const intialState = {
  isLoading: false,
  isLoadingCount: false,
  notCount: 0,
  message: "",
  messageCount: '',
  notificationListItem: {} as INotificationItem[]
};

export interface notificationState {
  isLoading: boolean;
  message: string;
  messageCount: string;
  notificationListItem: INotificationItem[];
  notCount: number;
  isLoadingCount: boolean;
}



export default (state: notificationState = intialState, action: Action) => {
  switch (action.type) {
    case NOTIFICATION_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
        message: action.payload
      };
    case NOTIFICATION_LIST_GET:
      return {
        ...state,
        isLoading: false,
        loginErrorMessage: '',
        notificationListItem: action.payload
      };
    case NOTIFICATION_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        message: action.payload
      };
    case NOTIFICATION_COUNT_FAILED:
      return {
        ...state,
        isLoadingCount: false,
        messageCount: action.payload
      };
    case NOTIFICATION_COUNT_GET:
      return {
        ...state,
        isLoading: false,
        messageCount: '',
        notCount: action.payload
      };
    case NOTIFICATION_COUNT_LOADING:
      return {
        ...state,
        isLoading: true,
        message: action.payload
      };
    case RESET_PROPS:
      return {
        ...state,
        isLoading: false,
        message: ""
      };
    default:
      return state;

  }
};
