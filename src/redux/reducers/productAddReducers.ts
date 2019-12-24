import { ProductAdd, Action } from "../states";
import {PRODUCT_ADD_SUCCEED,PRODUCT_ADD_FAILED, PRODUCT_ADD_LOADING, RESET_PROPS} from "../types";


const initalState = {
    isSuccess: null,
    ProductAddMessage: "",
    isAddLoading:false
  };

export default (state: ProductAdd = initalState, action: Action) => {
  switch (action.type) {
    case PRODUCT_ADD_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        ProductAddMessage:"Ürün Oluşturuldu.",
      };
      case PRODUCT_ADD_FAILED:     
      return {
        ...state,
        isSuccess:false,
         ProductAddMessage:"Ürün Oluşturulamadı!",
      };
      case PRODUCT_ADD_LOADING:
        return {
          ...state,
          isAddLoading:action.payload

        }
        case RESET_PROPS:
         return {
            ...state,
            isAddLoading:false,
            ProductAddMessage:"Ürün Oluşturulamadı!",
          }
    default:
      return state;
  }
};