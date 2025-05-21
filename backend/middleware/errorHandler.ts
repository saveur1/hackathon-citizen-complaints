import type { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";
import { env } from "@/config/envConfig";
import { ServiceResponse } from "@/utils/serviceResponse";

//ADD 404 TO NOT FOUND ERROR
const unexpectedRequest: RequestHandler = (_req, res, next) => {
    return next(ErrorHandler.NotFound("Resources not found"));
};

//ADD ERROR TO REQUEST LOG
const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
    res.locals.err = err;
    next(err);
};

//RETURN ERROR TO USER AS JSON
const returnErrorToUser: ErrorRequestHandler = (error, _req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = { ...error, statusCode, message };

    if(env.NODE_ENV === "development") {
        console.log(error);
        res.status(error.statusCode).json({
            success:false,
            message: error.message,
            error,
            stack: error.stack
        })
    }

    if(env.NODE_ENV === "production"){
        if(error.name === "CastError") {
            const message = `Resource Not Found. Invalid ${error.path}`;
            error = new ErrorHandler(message,400);
        }
        
        if(error.name ==="ValidationError") {
            const message = Object.values(error.errors).map((val: any) => val.message).join(", ");
            error = new ErrorHandler(message, 400);
        }

        if(error.name === "ZodError"){
            const message = error.issues.map((issue: any) => {
                const fieldName = issue.path[0];
                const fieldNameLower = fieldName.toLowerCase();
                const messageLower = issue.message.toLowerCase();
                
                // If field name is not already part of the message, include both
                if (!messageLower.includes(fieldNameLower)) {
                    return `${fieldName}: ${issue.message}`;
                }
                return issue.message;
            }).join(", ");
            error = new ErrorHandler(message, 400);
        }

        if(error.code === 11000){
            const message = `${Object.keys(error.keyValue)} Already exists in database`;
            error = new ErrorHandler(message,400);
        }

        if(error.name === "JsonWebTokenError"){
            const message = "JSON web token is invalid. Try Again!!!";
            error = new ErrorHandler(message,400);
        }

        if(error.name === "TokenExipiredError"){
            const message = "JSON web token is Expired. Try Again!!!";
            error = new ErrorHandler(message,400);
        }

        return ServiceResponse.failure(error.message || "Internal Server Error", null, error.statusCode, res);
    }
}

// HANDLE ERRORS BY ATTACHING STATUS CODE AND MESSAGES
export class ErrorHandler extends Error {
    readonly statusCode: number;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }

    static BadRequest(message: string) {
        return new ErrorHandler(message, 400);
    }
    
    static NotFound(message: string) {
        return new ErrorHandler(message, 404);
    }

    static InternalServerError(message = "Internal Server Error") {
        return new ErrorHandler(message, 500);
    }
}

//CATCH ASYNCHRONOUS ERROS
export const asyncCatch = (handler: any) => (req: Request,res: Response,next: NextFunction)=>
                               Promise.resolve( handler(req, res, next) )
                                       .catch( next );


export default () => [unexpectedRequest, addErrorToRequestLog, returnErrorToUser];
