import axios from "axios";
import {showAlert} from './alert'

export const updateSettings= async(data,type)=>{
try{
    const url= type==='password'? 'http://127.0.0.1:3000/api/v2/users/updatemypassword': 'http://127.0.0.1:3000/api/v2/users/updateme';
    const res= await axios({
        method: 'PATCH',
        url,
        data
    })
    if(res.data.status==='success'){
        showAlert(res.data.status, 'data updated successfully')
          }
}catch(err){
    showAlert('error', err.response.data.message)
        
    }
}