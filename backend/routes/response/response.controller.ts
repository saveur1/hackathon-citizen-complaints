import type { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import { Response as ResponseModel } from "@/routes/response/response.model"
import { Complaint } from "@/routes/complaint/complaint.model"
import { User } from "@/routes/user/user.model"
import { Agency } from "@/routes/agency/agency.model"
import { ErrorHandler, asyncCatch } from "@/middleware/errorHandler";
import { createResponseSchema } from "@/routes/response/response.schema";
import { UserRole } from "@/utils/enums";

export const createResponse = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Validate input
    const validatedData = createResponseSchema.parse(req.body)

    // 2) Check if complaint exists
    const complaint = await Complaint.findById(validatedData.complaint)
    if (!complaint) {
        return next(new ErrorHandler("Complaint not found", StatusCodes.NOT_FOUND))
    }

    // 3) Check permissions
    if (req.user.role === UserRole.CITIZEN) {
        // Citizens can only respond to their own complaints
        if (complaint.submittedBy.toString() !== req.user._id.toString()) {
            return next(new ErrorHandler("You do not have permission to respond to this complaint", StatusCodes.FORBIDDEN))
        }
        // Citizens can't add internal notes
        delete validatedData.internalNotes
    } else if (req.user.role === UserRole.AGENCY_STAFF) {
        // Agency staff can only respond to complaints handled by their agency
        const agency = await Agency.findOne({ contactEmail: req.user.email }) as { _id: string } | null;
        if (!agency || (complaint.handledBy && complaint.handledBy.toString() !== agency._id)) {
            return next(new ErrorHandler("You do not have permission to respond to this complaint", StatusCodes.FORBIDDEN))
        }
    }

    // 4) Create response
    const newResponse = await ResponseModel.create({
        ...validatedData,
        createdBy: req.user._id,
    })

    // 5) Update complaint and user
    await Complaint.findByIdAndUpdate(validatedData.complaint, {
        $push: { responses: newResponse._id },
    })

    await User.findByIdAndUpdate(req.user._id, {
        $push: { responses: newResponse._id },
    })

    // 6) Send response
    res.status(StatusCodes.CREATED).json({
        status: "success",
        data: {
        response: newResponse,
        },
    })
})

export const getResponses = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Check if complaint exists
    const complaint = await Complaint.findById(req.params.complaintId)
    if (!complaint) {
        return next(new ErrorHandler("Complaint not found", StatusCodes.NOT_FOUND))
    }

    // 2) Check permissions
    if (req.user.role === UserRole.CITIZEN) {
        // Citizens can only view responses to their own complaints
        if (complaint.submittedBy.toString() !== req.user._id.toString()) {
            return next(new ErrorHandler("You do not have permission to view these responses", StatusCodes.FORBIDDEN))
        }
    } else if (req.user.role === UserRole.AGENCY_STAFF) {
        // Agency staff can only view responses to complaints handled by their agency
        const agency = await Agency.findOne({ contactEmail: req.user.email })
        if (!agency || (complaint.handledBy && complaint.handledBy.toString() !== (agency as any)._id.toString())) {
            return next(new ErrorHandler("You do not have permission to view these responses", StatusCodes.FORBIDDEN))
        }
    }

    // 3) Get responses
    const responses = await ResponseModel.find({ complaint: req.params.complaintId })
        .populate("createdBy", "name email role")
        .sort({ createdAt: -1 })

    // 4) Filter internal notes for citizens
    let filteredResponses = responses
    if (req.user.role === UserRole.CITIZEN) {
        filteredResponses = responses.map((response: typeof ResponseModel.prototype) => {
            const responseObj = response.toObject()
            delete responseObj.internalNotes
            return responseObj
        })
    }

    // 5) Send response
    res.status(StatusCodes.OK).json({
        status: "success",
        results: filteredResponses.length,
        data: {
            responses: filteredResponses,
        },
    })
})
