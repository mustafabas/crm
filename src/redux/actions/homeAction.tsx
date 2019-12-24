import { AsyncStorage } from "react-native";
import axios from 'axios'
import { WATER_CUSTOMERS_HOME_GET } from './../constants'
import { Dispatch } from "react";
import { CUSTOMER_GET, HOME_LOADING_CUSTOMERS, CUSTOMER_GET_MORE } from './../types'
import { Action } from '../states'
import { ICustomerItem } from "../models/homeModel";


export function GetCustomers(orderType: number, searchText: string, dayOfWeek: number, pageIndex: number) {

  return (dispatch: Dispatch<Action>) => {

    dispatch(loading(true));

    AsyncStorage.multiGet(['userToken', 'userId']).then((res) => {
      let token = res[0][1];
      let userId = res[1][1];
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    var WATER_CUSTOMERS_HOME_GET_ORDER_TYPE_SEARCH_TEXT = WATER_CUSTOMERS_HOME_GET + orderType + "&searchText=" + searchText + "&pageIndex=" + pageIndex + "&pageSize=15&dayOfWeek=" + dayOfWeek + `&userId=${userId}`;
console.log(WATER_CUSTOMERS_HOME_GET_ORDER_TYPE_SEARCH_TEXT)
    axios.get(WATER_CUSTOMERS_HOME_GET_ORDER_TYPE_SEARCH_TEXT,{
      headers: headers 
    }

    )
      .then((response) => {

        if (response.data.isSuccess) {
          var customersModel: ICustomerItem[] = [];

          response.data.result.homeCustomerItemModels.forEach((customer: any) => {
            var customerItem: ICustomerItem = {
              customerId: customer.customerId,
              companyName: customer.companyName,
              nameSurname: customer.nameSurname,
              displayTotalAmount: customer.displayTotalAmount,
              totalAmount: customer.totalAmount,
              displayRestTotalAmount: customer.displayRestTotalAmount,
              restTotalAmount: customer.restTotalAmount,
              displayTookTotalAmount: customer.displayTookTotalAmount,
              dayOfWeek: customer.dayOfWeek,
              fountainCount: customer.fountainCount,
              dayOfWeeks: customer.dayOfWeeks,
            }
            customersModel.push(customerItem);
          });

          dispatch(customers(customersModel));
          dispatch(loading(false));
        }


        else {
          dispatch(loading(false));
        }
      })
      .catch((err) => {
        dispatch(loading(false));

      });


  })

   
  }

}

export function GetCustomerMore(orderType: number, searchText: string, dayOfWeek: number, pageIndex: number) {
  return (dispatch: Dispatch<Action>) => {



    var WATER_CUSTOMERS_HOME_GET_ORDER_TYPE_SEARCH_TEXT = WATER_CUSTOMERS_HOME_GET + orderType + "&searchText=" + searchText + "&pageIndex=" + pageIndex + "&pageSize=10&dayOfWeek=" + dayOfWeek;

    axios.get(WATER_CUSTOMERS_HOME_GET_ORDER_TYPE_SEARCH_TEXT,

    )
      .then(async (response) => {

        if (response.data.isSuccess) {
          var customersModel: ICustomerItem[] = [];

          await response.data.result.homeCustomerItemModels.forEach((customer: any) => {
            var customerItem: ICustomerItem = {
              customerId: customer.customerId,
              companyName: customer.companyName,
              nameSurname: customer.nameSurname,
              displayTotalAmount: customer.displayTotalAmount,
              totalAmount: customer.totalAmount,
              displayRestTotalAmount: customer.displayRestTotalAmount,
              restTotalAmount: customer.restTotalAmount,
              displayTookTotalAmount: customer.displayTookTotalAmount,
              dayOfWeek: customer.dayOfWeek,
              fountainCount: customer.fountainCount,
              dayOfWeeks: customer.dayOfWeeks,
            }
            customersModel.push(customerItem);
          });
     
          dispatch(customersMore(customersModel));

        }


        else {

        }
      })
      .catch((err) => {
        // dispatch(loading(false));

      });


  }
}

export const loading = (loader: boolean) => ({
  type: HOME_LOADING_CUSTOMERS,
  payload: loader
})

export const customers = (customers: ICustomerItem[]) => ({
  type: CUSTOMER_GET,
  payload: customers
})
export const customersMore = (customers: ICustomerItem[]) => ({
  type: CUSTOMER_GET_MORE,
  payload: customers
})
