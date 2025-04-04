import axios from "axios";
import {showAlert} from './alert'
const stripe= Stripe('pk_test_51O4KZKK4mclvTzynDHpPMprjsmtxcGeFRlIKxtkMvssItxYf7lJrhxZ1ei4v6wcdOD0HSU5Cv8lJUPUyTcdeY3Vf00Um2IGD8N')

export const bookTour= async tourId=>{
    try{
        const session= await axios({
            method:'GET',
            url:`http://127.0.0.1:3000/api/v2/bookings/checkout-session/${tourId}`
        })
        console.log(session)
       await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })
    }catch(err){
        showAlert(err)
    }
    

}