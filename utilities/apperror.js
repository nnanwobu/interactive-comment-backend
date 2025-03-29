class AppError extends Error{

    constructor(message,statusCode ,isOperational=true){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')? 'fail':'Error'
        this.isOperational = isOperational;
        Error.captureStackTrace(this,this.constructor)
    }
}
module.exports = AppError