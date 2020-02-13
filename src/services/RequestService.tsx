
import axios from 'axios'
import { WATER_NOTIFICATION_DELETE_BYID, WATER_NOTIFICATION_TOKEN_DELETE } from '../redux/constants'
import { AsyncStorage } from 'react-native';

export const DeleteNotification = (id1:number) => {
    axios.get(WATER_NOTIFICATION_DELETE_BYID+"/delete?notificationId="+id1.toString()).then(res=>
       {
           console.log(res);
            if(res.data.result){
                console.log("deleted notification");
            }
       }
       ).catch(err=>{
           console.log(err);
       });
 }


 export const deleteNotificaitonToken = (userId : string , token : string,notificationToken : string) => {

    
    console.log("notificationTokenSilincek",userId,"toke",token,"nottoke",notificationToken)


        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  
      axios.post(WATER_NOTIFICATION_TOKEN_DELETE,{
        userId: userId,
        appToken: notificationToken
      }
      
        ,{headers: headers })
      .then((response) =>{
        
      if(response.data.isSuccess){
         


        }
       
      
      else {


      }
      })
      .catch((err) => {

      });
    
  



 }