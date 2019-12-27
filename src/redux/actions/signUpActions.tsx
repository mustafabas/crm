import { AsyncStorage } from "react-native";
import axios from 'axios'
import {WATER_USER_CREATE_CONTROL_EMAIL, WATER_USER_CREATE} from './../constants'
import { Dispatch } from "react";
import {SIGNUP_FAILED,SIGNUP_STARTED,SIGNUP_SUCCEED,RESET_PROPS, USER_CREATE_FIRST_STEP, SIGNUP2_SUCCEED, SIGNUP2_FAILED, SIGNUP2_STARTED} from './../types'
import {Action} from '../states'
import { UserFirstData } from "../reducers/signUpReducers";
import { navigate } from "../services/Navigator";


export interface BaseUser {
    nameSurname: string;
    phoneNumber: string;
    email: string;
    password: string;
    companyName: string;
    address: string;
}


export function createBaseUser(user :BaseUser) {
    return(dispatch : Dispatch<Action>) => {
        dispatch(loading(true));



        axios.post(WATER_USER_CREATE,{
        nameSurname: user.nameSurname,
    phoneNumber: user.phoneNumber,
    email: user.email,
    password: user.phoneNumber,
    companyName: user.phoneNumber,
    address: user.phoneNumber,

        }).then((res)=> {
            if(res.data.isSuccess) {


                AsyncStorage.multiSet([['userToken',res.data.result.token],['userId',res.data.result.userId.toString()]])
                .then(() => {
                  dispatch(loginIsSucceedSecond(true,""));
                  dispatch(reset());
                //   navigate('LoginPhoneVerify');
        
                })
                .catch(error => {
                  dispatch(loginIsSucceedSecond(false,"Bir Hata Meydana Geldi"));
                  dispatch(reset())
                })
                

            }else {
                dispatch(loginIsSucceedSecond(false,"Bir Hata Meydana Geldi"));
                dispatch(reset())
            }

        }).catch(err =>{
            console.log(err.response)
        })



    }
}
export function controlEmail(NameSurname: string,password:string , email:string) {

  return (dispatch : Dispatch<Action>) =>  {
      var user = {} as UserFirstData 
    user.NameSurname = NameSurname
    user.email = email
    user.password = password

    
     
    dispatch(loading(true));
  

    dispatch(signUpFirstSucceed(user))
    dispatch(loginIsSucceed(true,""));
    dispatch(reset());




//   axios.post(WATER_USER_CREATE_CONTROL_EMAIL,
//     {
//         email: email,
//     })
//   .then((response) =>{
//   if(response.data.isSuccess){

//     dispatch(loginIsSucceed(true,"")); 
//     dispatch(reset());
//     }

   
  
//   else {
//     if(response.data.message == "User.Login.UserNotFound"){
//       dispatch(loginIsSucceed(false,"Böyle bir kullanıcı bulunamadı!")); 
//       dispatch(reset());
//     }
//   }
//   })
//   .catch(() => {
//     dispatch(loginIsSucceed(false, "Bir hata oluştu."));
//     // dispatch(reset());
//     dispatch(reset());

//   });

 
  }

}
  
  
  export const loading = (loader : boolean) => ({
    type : SIGNUP_STARTED,
    payload : loader
  })
  export const loadingSecond = (loader : boolean) => ({
    type : SIGNUP2_STARTED,
    payload : loader
  })
  
  
  export const loginIsSucceed = (loginIsSucced : boolean, message:string) => ({
    type : loginIsSucced ? SIGNUP_SUCCEED : SIGNUP_FAILED,
    payload : message
  })

  export const loginIsSucceedSecond = (loginIsSucced : boolean, message:string) => ({
    type : loginIsSucced ? SIGNUP2_SUCCEED : SIGNUP2_FAILED,
    payload : message
  })

  


  export const signUpFirstSucceed = (user : UserFirstData) => ({
    type : USER_CREATE_FIRST_STEP,
    payload : user
  })
  
  
  
  export const reset = () => ({
    type : RESET_PROPS,
    payload:null
  })