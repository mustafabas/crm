import { EmployeeAdd, Action, EmployeeEditRedecurState } from "../states";
import {EMPLOYEE_EDIT_SUCCEED,EMPLOYEE_EDIT_FAILED, EMPLOYEE_GET_ONE, EMPLOYEE_EDIT_LOADING, RESET_PROPS} from "../types";
import { stat } from "fs";


const initalState = {
    isSuccess: false,
    EmployeeUpdateMessage: "",
    employee:null,
    isLoading:false
  };

export default (state: EmployeeEditRedecurState = initalState, action: Action) => {
  switch (action.type) {
    case EMPLOYEE_EDIT_SUCCEED:    
      return {
        ...state,
        isSuccess:true,
        EmployeeUpdateMessage:"Çalışan Düzenlendi.",
        isLoading : false
      };
      case EMPLOYEE_EDIT_FAILED:     
      return {
        ...state,
        isSuccess:false,
        EmployeeUpdateMessage:"Çalışan Düzenlenemedi!",
        isLoading : false
      };
      case EMPLOYEE_GET_ONE:     
      return {
        ...state,
        isSuccess:false,
        employee: action.payload,
        EmployeeUpdateMessage:"",
      };
      case EMPLOYEE_EDIT_LOADING:
        return {
          ...state,
          isLoading:action.payload,
        };
        case RESET_PROPS:
          return {
            ...state,
            EmployeeUpdateMessage:"",
            isSuccess:false
          }

    default:
      return state;
  }
};