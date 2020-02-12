
import axios from 'axios'
import { WATER_NOTIFICATION_DELETE_BYID } from '../redux/constants'

export const DeleteNotification = (id1:number) => {
    axios.delete(WATER_NOTIFICATION_DELETE_BYID+"?notificationId="+id1.toString()).then(res=>
       {
            if(res.data.result){
                console.log("deleted notification");
            }
       }
       ).catch(err=>{
           console.log(err);
       });
 }