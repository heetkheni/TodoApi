class ErrorHandler extends Error {

    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode
    }
}


export const errorMiddleware = (err,req,res,next) => {

    err.message = err.message || "Internal Error"
    err.statusCode = err.statusCode || 500
    return res.status(err.statusCode).json({
        success:true,
        message:err.message
    })
}


export default ErrorHandler