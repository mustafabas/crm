import axios from 'axios'
import {WATER_ADD_EMPLOYEE_COST} from '../constants'
import { Dispatch } from "react";
import {EMPLOYEE_COST_ADD_SUCCEED,EMPLOYEE_COST_ADD_FAILED, EMPLOYE_COST_ADD_LOADING} from '../types'
import {Action} from '../states'
import { copyFile } from 'fs';


export function employeeCost(employeId:number, cost:number) {

  return (dispatch : Dispatch<Action>) =>  {
    console.log("employeCostAdd");
    dispatch(employeeAddCostLoading(true));
  axios.post(WATER_ADD_EMPLOYEE_COST,
    {
        employeId: employeId,
        cost: cost,
    })
  .then((response) =>{
  if(response.data.isSuccess){
      if(response.data.result){
        console.log(response.data.result);
        dispatch(employeCostIsSucceed(true, "Çalışan Gider Eklendi!"));

      }
    }
  })
  .catch(error => { 
    dispatch(employeCostIsSucceed(false,"Çalışan Gider Eklenirken bir hata oluştu."));

  });

  }

}

  export const employeCostIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EMPLOYEE_COST_ADD_SUCCEED : EMPLOYEE_COST_ADD_FAILED,
    payload : message
  })
  
  export const employeeAddCostLoading = (loading:boolean) => ({
    type :  EMPLOYE_COST_ADD_LOADING,
    payload : loading
  })
  
  
