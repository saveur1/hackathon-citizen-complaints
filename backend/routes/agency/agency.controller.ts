import type { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import { Agency } from "@/routes/agency/agency.model";
import { ErrorHandler, asyncCatch } from "@/middleware/errorHandler";
import { createAgencySchema, updateAgencySchema } from "@/routes/agency/agency.schema";

export const createAgency = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Validate input
    const validatedData = createAgencySchema.parse(req.body)

    // 2) Check if agency already exists
    const existingAgency = await Agency.findOne({ name: validatedData.name })
    if (existingAgency) {
        return next(new ErrorHandler("Agency with this name already exists", StatusCodes.CONFLICT))
    }

    // 3) Create agency
    const newAgency = await Agency.create(validatedData)

    // 4) Send response
    res.status(StatusCodes.CREATED).json({
        status: "success",
        data: {
        agency: newAgency,
        },
    })
})

export const getAllAgencies = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const agencies = await Agency.find()

    res.status(StatusCodes.OK).json({
        status: "success",
        results: agencies.length,
        data: {
        agencies,
        },
    })
})

export const getAgency = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const agency = await Agency.findById(req.params.id)

    if (!agency) {
        return next(new ErrorHandler("Agency not found", StatusCodes.NOT_FOUND))
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
        agency,
        },
    })
})

export const updateAgency = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Validate input
    const validatedData = updateAgencySchema.parse(req.body)

    // 2) Update agency
    const updatedAgency = await Agency.findByIdAndUpdate(req.params.id, validatedData, {
        new: true,
        runValidators: true,
    })

    if (!updatedAgency) {
        return next(new ErrorHandler("Agency not found", StatusCodes.NOT_FOUND))
    }

    // 3) Send response
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
        agency: updatedAgency,
        },
    })
})

export const deleteAgency = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const agency = await Agency.findByIdAndDelete(req.params.id)

    if (!agency) {
        return next(new ErrorHandler("Agency not found", StatusCodes.NOT_FOUND))
    }

    res.status(StatusCodes.NO_CONTENT).json({
        status: "success",
        data: null,
    })
})
