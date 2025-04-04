import axios from 'axios';
import {showAlert} from './alert'

export const logIn= async(email,password)=>{
  
    try{
        const res= await axios({
            method:'POST',
            url:'http://127.0.0.1:3000/api/v2/users/login',
            data:{
                email,
                password
            }   
        });
        // console.log(res)
        if(res.data.status==='success'){
            showAlert(res.data.status, 'login successful')
            window.setTimeout(()=>{
                location.assign('/')
            },1500)
        }
    }catch(err){
        showAlert('error', err.response.data.message)
        
        
    }
}

export const logout= async ()=>{
    try{
        const res= await axios({
            method:'GET',
            url: 'http://127.0.0.1:3000/api/v2/users/logout'
        })
        if(res.data.status==='success') location.reload(true)
        location.assign('/login')
        showAlert('success','loggedout successfully')
    }catch(err){
        showAlert('error','logging out. try again!')
    }
}


   