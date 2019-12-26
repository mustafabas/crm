import axios from 'axios'
import {WATER_EDIT_EMPLOYEE, WATER_GET_EMPLOYEEBYID} from './../constants'
import { Dispatch } from "react";
import {EMPLOYEE_EDIT_SUCCEED,EMPLOYEE_EDIT_FAILED, EMPLOYEE_GET_ONE, EMPLOYEE_EDIT_LOADING} from './../types'
import {Action} from '../states'
import AsyncStorage from '@react-native-community/async-storage';
import { IEmployeeItem, IEmployeeItemBaseResponseModel } from '../models/employeeModel';
import { GetEmployees } from './employeeAction';
import { reset } from './loginAction';


export function employeeEdit(nameSurname:string, monthlySalary:number,email:string,password:string, phoneNumber:string, identityNumber:string, address:string, dailyPriceFood:number, employeeId :number, active:boolean) {

  return (dispatch : any) =>  {
    dispatch(employeEditLoading(true));
    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1]; 
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    axios.post(WATER_EDIT_EMPLOYEE,
      {
          nameSurname: nameSurname,
          monthlySalary: monthlySalary,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          identityNumber: identityNumber,
          address: address,
          dailyFoodPrice: dailyPriceFood,
          userId:userId,
          employeId: employeeId,
          active: active,
          
      },
      {
        headers: headers 
      }
  )
    .then((response) =>{
      console.log(response);
    if(response.data.isSuccess){
  
        if(response.data.result){
          dispatch(employeEditIsSucceed(true, "Çalışan Eklendi!"));
          dispatch(reset());
          dispatch(GetEmployees());
         }
      }
    })
    .catch(error => { 
      console.log(error);
      dispatch(employeEditIsSucceed(false,"Çalışan Eklenirken bir hata oluştu."));
      dispatch(reset());
    });
  });
  }
}
export function getEmployeeById(employeeId:number) {

  return (dispatch : Dispatch<Action>) =>  {

    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1]; 
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    axios.get(WATER_GET_EMPLOYEEBYID+`?employeeId=${employeeId}`
    ,
      {
        headers: headers 
      }
      )
          .then((response) => {

              if (response.data.isSuccess) {
                  
                  var employee = response.data.result.employe;
                
                      var employeeItem: IEmployeeItemBaseResponseModel = {
                          employeeId: employee.employeeId,
                          employeeName: employee.nameSurname,
                          monthlySalary: employee.monthlySalary,
                          address:employee.address,
                          phoneNumber:employee.phoneNumber,
                          identityNumber:employee.identityNumber,
                          dailyPriceFood:employee.dailyFoodPrice,
                          active: employee.active,
                          addAsUser : response.data.result.addAsUser,
                          password : response.data.result.password,
                          mail: response.data.result.email
                      }                
                    dispatch(employe(employeeItem));
              }
          })
          .catch((err) => {
            console.log(err);
          });

  });

}
}
  
  export const employeEditIsSucceed = (isSuccess : boolean, message:string) => ({
    type : isSuccess ? EMPLOYEE_EDIT_SUCCEED : EMPLOYEE_EDIT_FAILED,
    payload : message
  })
  
  export const employe = (data:IEmployeeItemBaseResponseModel) => ({
    type : EMPLOYEE_GET_ONE,
    payload : data
  })
  export const employeEditLoading = (val : boolean) => ({
    type :  EMPLOYEE_EDIT_LOADING,
    payload : val
  })
  