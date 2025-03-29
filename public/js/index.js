import '@babel/polyfill'
import {logIn,logout,account} from './login'
import {displayMap} from './mapbox'
import {updateSettings} from './updatesetting' 
import {bookTour} from './stripe'



const mapbox= document.getElementById('map')
const loginForm= document.querySelector('.form--login')
const logoutBtn=document.querySelector('.nav__el--logout')
const userDataUpdateBtn= document.querySelector('.form-user-data')
const userSettingsBtn= document.querySelector('.form-user-settings')
const progress=document.querySelector('.savepass')
const bookTourBtn= document.getElementById('book-tour')

// const accounts= document.querySelector('.nav__el')


 if(mapbox){
    const locations= JSON.parse(mapbox.dataset.locations)
    displayMap(locations)
 }

if(loginForm)
 loginForm.addEventListener('submit', function(e){
    e.preventDefault()
    const email= document.getElementById('email').value
    const password= document.getElementById('password').value
    logIn(email,password)

})   
if(logoutBtn){
     logoutBtn.addEventListener('click',function(e){
            const clicked= e.target.closest('.nav__el--logout')
            if(!clicked) return
            logout()
        })
}

if(userDataUpdateBtn){
   userDataUpdateBtn.addEventListener('submit', async function(e){
   e.preventDefault()
   const form= new FormData()
   form.append('name',document.getElementById('name').value)
   form.append('email',document.getElementById('email').value)
   form.append('photo',document.getElementById('photo').files[0])
   console.log(form)
   await updateSettings(form,'userData')
   location.reload(true)
   })
}
       
if(userSettingsBtn){
   userSettingsBtn.addEventListener('submit',async function(e){
      e.preventDefault()
      progress.textContent='updating....'
      const currentpassword= document.getElementById('password-current').value
      const password= document.getElementById('password').value
      const passwordConfirm= document.getElementById('password-confirm').value
      await updateSettings({currentpassword,password,passwordConfirm},'password')
      progress.textContent='save password'
      currentpassword=''
      password=''
      passwordConfirm=''
   
   
   })
}

if(bookTourBtn){
   
   bookTourBtn.addEventListener('click', async function(e){
   
   e.target.textContent='processing...'
   const tourId= e.target.dataset.tourid
   
   await bookTour(tourId)
   })
}