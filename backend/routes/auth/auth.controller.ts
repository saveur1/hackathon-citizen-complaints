import type { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { env } from "@/config/envConfig"
import { User } from "@/routes/user/user.model"
import { ErrorHandler, asyncCatch } from "@/middleware/errorHandler"
import { createUserSchema, loginUserSchema, forgotPasswordSchema, resetPasswordSchema } from "@/routes/user/user.schema"
import { sendEmail } from "@/utils/email"

const signToken = (id: any) => {
    return jwt.sign({ id }, env.JWT_SECRET as any, {
        expiresIn: env.JWT_EXPIRES_IN as any,
    })
}

export const register = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Validate input
    const validatedData = createUserSchema.parse(req.body);

    // 2) Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email })
    if (existingUser) {
        return next(new ErrorHandler("Email already in use", StatusCodes.CONFLICT))
    }

    // 3) Create user
    const newUser = await User.create(validatedData) as typeof User.prototype

    // 4) Generate JWT
    const token = signToken((newUser._id as string).toString())

    // 5) Send response
    res.status(StatusCodes.CREATED).json({
        status: "success",
        token,
        data: {
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
        },
    })
})

export const login = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Validate input
    const validatedData = loginUserSchema.parse(req.body)

    // 2) Check if user exists & password is correct
    const user = await User.findOne({ email: validatedData.email }).select("+password") as (typeof User.prototype & { _id: string })
    if (!user || !(await user.comparePassword(validatedData.password))) {
        return next(new ErrorHandler("Incorrect email or password", StatusCodes.UNAUTHORIZED))
    }

    // 3) Generate JWT
    const token = signToken(user._id.toString())

    // 4) Send response
    res.status(StatusCodes.OK).json({
        status: "success",
        token,
        data: {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        },
    })
})

export const getMe = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      user: req.user,
    },
  })
})

export const forgotPassword = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Validate input
    const validatedData = forgotPasswordSchema.parse(req.body)

    // 2) Check if user exists
    const user = await User.findOne({ email: validatedData.email })
    if (!user) {
        return next(new ErrorHandler("No user found with that email address", StatusCodes.NOT_FOUND))
    }

    // 3) Generate random reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await user.save({ validateBeforeSave: false })

    // 4) Send reset email
    const resetURL = `${env.CORS_ORIGIN}/reset-password/${resetToken}`
    const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`

    try {
        await sendEmail({
            email: user.email,
            subject: "Your password reset token (valid for 1 hour)",
            message,
        })

        res.status(StatusCodes.OK).json({
            status: "success",
            message: "Token sent to email!",
        })
    } catch (err) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler("There was an error sending the email. Try again later!", StatusCodes.INTERNAL_SERVER_ERROR))
    }
})

export const resetPassword = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Validate input
    const validatedData = resetPasswordSchema.parse(req.body)

    // 2) Get user based on the token
    const hashedToken = crypto
        .createHash("sha256")
        .update(validatedData.token)
        .digest("hex")

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
    }) as (typeof User.prototype & { _id: string })

    if (!user) {
        return next(new ErrorHandler("Token is invalid or has expired", StatusCodes.BAD_REQUEST))
    }

    // 3) Update password
    user.password = validatedData.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    // 4) Log the user in, send JWT
    const token = signToken(user._id.toString())

    res.status(StatusCodes.OK).json({
        status: "success",
        token,
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        },
    })
})
