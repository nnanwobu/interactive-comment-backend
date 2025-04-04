const AppError = require('./../utilities/apperror')
// const AppError=require('./../utilities/apperror')

const handleCastErrorDB= err=>{
    const message=`invalid ${err.path}: ${err.value} can not be found in the server`
 return new AppError(message,400) 
}


const handleDuplicateErrorDB= err=>{
    const value= Object.values(err.keyValue)[0]
    const key= Object.keys(err.keyValue)[0]

    const message= `${key}, ${value} already exist!, please use a different ${key}`
    return new AppError(message,400)
}


const handleValidationErrorDB= err=>{
    const x= Object.values(err.errors).map(el=>el.message).join('.')
    const message= `validator Error: ${x} `
    return new AppError(message,400)
}
const handleJWTError=err=> new AppError('ivalid token. please try and login')
const handleTokenExpiredError= err=> new AppError('Token has expired. please login again')

const sendErrorDev=(err,req,res)=>{
if(req.originalUrl.startsWith('/api')){
    return res.status(err.statusCode).json({
        status: err.status,
        err: err,
        message: err.message,
        stack: err.stack, 
        })
    }
    console.log('error 💥',err)
    return  res.status(err.statusCode).render('errorpage',{
        title:'Something went wrong!',
        msg: err.message
    })

}
const sendErrorProd=(err,req,res)=>{
   if(req.originalUrl.startsWith('/api')){

    if(err.isOperational){
        console.log('error 💥',err)
       return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
   }
   return res.status(500).json({
    status: err.status,
    message: 'something went very wrong'
    })

  }
// for the website
if(err.isOperational){

    return res.status(err.statusCode).reder('errorpage',{
      title:'Something went wrong!',
          msg: err.message
    })
}
    return res.status(err.statusCode).reder('errorpage',{
        title:'Something went wrong!',
            msg: 'Try again later!'
      })

}


const globalErrorHandler= (err,req,res,next)=>{
    err.statusCode= err.statusCode||500;
    err.status= err.status ||'Error'
    if(process.env.NODE_ENV==="development"){
        sendErrorDev(err,req,res)
        // console.log({...err});
    }else if(process.env.NODE_ENV==="production"){
        let error = { ...err };
        error.message=err.message
        console.log(error)
        if(error.name === 'CastError') error=handleCastErrorDB(error)
        if(error.code === 11000) error=handleDuplicateErrorDB(error)
        if(err.name === 'ValidationError') error = handleValidationErrorDB(error)
        if(error.name==='JsonWebTokenError') error=handleJWTError(error)
        if(error.name==='TokenExpiredError') error=handleTokenExpiredError(error)
             // console.log(error);
        sendErrorProd(error,req,res)
    }
}
module.exports =globalErrorHandler 