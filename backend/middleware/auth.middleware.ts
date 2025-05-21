import type { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import { env } from "@/config/envConfig"
import { User } from "@/routes/user/user.model";
import type { UserRole } from "@/utils/enums";
import { asyncCatch, ErrorHandler } from "@/middleware/errorHandler"

interface JwtPayload {
    id: string
}

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

export const protect = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get token and check if it exists
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return next(new ErrorHandler("You are not logged in. Please log in to get access.", StatusCodes.UNAUTHORIZED))
    }

    // 2) Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload

    // 3) Check if user still exists
    const user = await User.findById(decoded.id)
    if (!user) {
        return next(new ErrorHandler("The user belonging to this token no longer exists.", StatusCodes.UNAUTHORIZED))
    }

    // 4) Grant access to protected route
    req.user = user
    next()
})

export const restrictTo = (...roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler("You do not have permission to perform this action", StatusCodes.FORBIDDEN))
        }
        next()
    }
}
