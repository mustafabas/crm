import { AddOrder, Action } from "../states";
import {ADD_ORDER_SUCCEED,ADD_ORDER_FAILED, RESET_PROPS, ADD_ORDER_IS_LOADING} from "../types";


const initalState = {
    isSuccess: false,
    AddOrderMessage: "",
    isTried : false,
    isLoading : false
  };

export default (state: AddOrder = initalState, action: Action) => {
  switch (action.type) {
    case ADD_ORDER_SUCCEED:    
      return {
        ...state,
        AddOrderMessage:action.payload,
        isSuccess:true,
        isTried : true,
        isLoading : false
      };
      case ADD_ORDER_FAILED:     
      return {
        ...state,
        AddOrderMessage:action.payload,
        isSuccess:false,
        isTried : true,
          isLoading : false
      };
      case ADD_ORDER_IS_LOADING : 
      return {
        ...state,
        isLoading : action.payload
      }
      case RESET_PROPS : 
      return {
        ...state,
        isSuccess:false,
        AddOrderMessage:"",
        isTried : false,
        isLoading : false
      }
    default:
      return {...state};
  }
};