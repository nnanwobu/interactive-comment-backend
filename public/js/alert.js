export const hideAlert= function(){
    const el= document.querySelector('.alert');
    if(el) el.parentElement.removeChild(el)
    }

export const  showAlert= function(type,msg){
    hideAlert()
   const  markup= `<div class='alert alert--${type}'>${msg}</div>`
    document.querySelector('body').insertAdjacentHTML('afterbegin',markup)
    window.setTimeout(hideAlert,3000)
}

