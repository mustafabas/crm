import { IMAGE_DATA_FETCHED, DATA_LOADING, FETCH_MORE } from "../actions/fetch";
import { HomeState, Action } from "../states";
import { CUSTOMER_GET, HOME_LOADING_CUSTOMERS, CUSTOMER_GET_MORE } from "../types";


const intialState = {
  customers: [],
  isHomeLoading: false,
  totalRecords : 0
};

export default (state: HomeState = intialState, action: Action) => {
  switch (action.type) {
    case CUSTOMER_GET:
        
      return {
        ...state,
        customers: action.payload[0],
        totalRecords : action.payload[1],
        isHomeLoading:false
      };
      case CUSTOMER_GET_MORE:
        
        return {
          ...state,
          customers: [...state.customers, ...action.payload],
          isHomeLoading:false
        };
    case HOME_LOADING_CUSTOMERS:
      return {
        ...state,
        isHomeLoading: action.payload
      };
    default:
      return state;
  }
};
