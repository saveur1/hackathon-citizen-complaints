import type { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import { Complaint } from "@/routes/complaint/complaint.model"
import { User } from "@/routes/user/user.model"
import { Agency } from "@/routes/agency/agency.model"
import { ErrorHandler, asyncCatch } from "@/middleware/errorHandler"
import { createComplaintSchema, updateComplaintSchema } from "@/routes/complaint/complaint.schema";
import { UserRole } from "@/utils/enums";

export const createComplaint = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Validate input
    const validatedData = createComplaintSchema.parse(req.body)

    // 2) Check if agency exists if provided
    if (validatedData.handledBy) {
        const agency = await Agency.findById(validatedData.handledBy)
        if (!agency) {
            return next(new ErrorHandler("Agency not found", StatusCodes.NOT_FOUND))
        }
    }

    // 3) Create complaint
    const newComplaint = await Complaint.create({
        ...validatedData,
        submittedBy: req.user._id,
    })

    // 4) Update user's complaints
    await User.findByIdAndUpdate(req.user._id, {
        $push: { complaintsSubmitted: newComplaint._id },
    })

    // 5) Send response
    res.status(StatusCodes.CREATED).json({
        status: "success",
        data: {
        complaint: newComplaint,
        },
    })
})

export const getAllComplaints = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // Different queries based on user role
    let query = {}

    if (req.user.role === UserRole.CITIZEN) {
        // Citizens can only see their own complaints
        query = { submittedBy: req.user._id }
    } else if (req.user.role === UserRole.AGENCY_STAFF) {
        // Agency staff can see complaints handled by their agency
        const agency = await Agency.findOne({ contactEmail: req.user.email }) as { _id: string } | null
        if (!agency) {
        return next(new ErrorHandler("Agency not found for this staff member", StatusCodes.NOT_FOUND))
        }
        query = { handledBy: agency._id }
    }
    // Admins can see all complaints (empty query)

    // Apply filters from query params
    if (req.query.category) {
        query = { ...query, category: req.query.category }
    }
    if (req.query.status) {
        query = { ...query, status: req.query.status }
    }

    // Execute query with pagination
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const complaints = await Complaint.find(query)
        .populate("submittedBy", "name email")
        .populate("handledBy", "name contactEmail")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

    const total = await Complaint.countDocuments(query)

    res.status(StatusCodes.OK).json({
        status: "success",
        results: complaints.length,
        total,
        data: {
        complaints,
        },
    })
})

export const getComplaint = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const complaint = await Complaint.findById(req.params.id)
        .populate("submittedBy", "name email")
        .populate("handledBy", "name contactEmail")
        .populate("responses")
        .populate("attachments")

    if (!complaint) {
        return next(new ErrorHandler("Complaint not found", StatusCodes.NOT_FOUND))
    }

    // Check if user has permission to view this complaint
    if (req.user.role === UserRole.CITIZEN && complaint.submittedBy._id.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You do not have permission to view this complaint", StatusCodes.FORBIDDEN))
    }

    if (req.user.role === UserRole.AGENCY_STAFF) {
        const agency = await Agency.findOne({ contactEmail: req.user.email }) as { _id: string } | null
        if (!agency || (complaint.handledBy && complaint.handledBy._id.toString() !== agency._id.toString())) {
        return next(new ErrorHandler("You do not have permission to view this complaint", StatusCodes.FORBIDDEN))
        }
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
        complaint,
        },
    })
})

export const updateComplaint = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Validate input
    const validatedData = updateComplaintSchema.parse(req.body)

    // 2) Get complaint
    const complaint = await Complaint.findById(req.params.id)
    if (!complaint) {
        return next(new ErrorHandler("Complaint not found", StatusCodes.NOT_FOUND))
    }

    // 3) Check permissions
    if (req.user.role === UserRole.CITIZEN) {
        // Citizens can only update their own complaints and only if status is SUBMITTED
        if (complaint.submittedBy.toString() !== req.user._id.toString()) {
            return next(new ErrorHandler("You do not have permission to update this complaint", StatusCodes.FORBIDDEN))
        }
        if (complaint.status !== "SUBMITTED") {
            return next(new ErrorHandler("You can only update complaints with SUBMITTED status", StatusCodes.FORBIDDEN))
        }
        
        // Citizens can't update status or handledBy
        delete validatedData.status
        delete validatedData.handledBy
    } else if (req.user.role === UserRole.AGENCY_STAFF) {

        // Agency staff can only update complaints handled by their agency
        const agency = await Agency.findOne({ contactEmail: req.user.email }) as { _id: string } | null
        if (!agency || (complaint.handledBy && complaint.handledBy.toString() !== agency?._id.toString())) {
            return next(new ErrorHandler("You do not have permission to update this complaint", StatusCodes.FORBIDDEN))
        }

        // Agency staff can only update status
        const allowedUpdates = ["status"]
        Object.keys(validatedData).forEach((key) => {
            if (!allowedUpdates.includes(key)) {
                delete validatedData[key as keyof typeof validatedData]
            }
        })
    }

    // 4) Update complaint
    const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, validatedData, {
        new: true,
        runValidators: true,
    })
        .populate("submittedBy", "name email")
        .populate("handledBy", "name contactEmail")

    // 5) Send response
    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
        complaint: updatedComplaint,
        },
    })
})

export const deleteComplaint = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get complaint
    const complaint = await Complaint.findById(req.params.id)
    if (!complaint) {
        return next(new ErrorHandler("Complaint not found", StatusCodes.NOT_FOUND))
    }

    // 2) Check permissions
    if (req.user.role === UserRole.CITIZEN) {
        // Citizens can only delete their own complaints and only if status is SUBMITTED
        if (complaint.submittedBy.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You do not have permission to delete this complaint", StatusCodes.FORBIDDEN))
        }
        if (complaint.status !== "SUBMITTED") {
        return next(new ErrorHandler("You can only delete complaints with SUBMITTED status", StatusCodes.FORBIDDEN))
        }
    } else if (req.user.role === UserRole.AGENCY_STAFF) {
        // Agency staff cannot delete complaints
        return next(new ErrorHandler("Agency staff cannot delete complaints", StatusCodes.FORBIDDEN))
    }

    // 3) Delete complaint
    await Complaint.findByIdAndDelete(req.params.id)

    // 4) Update user's complaints
    await User.findByIdAndUpdate(complaint.submittedBy, {
        $pull: { complaintsSubmitted: complaint._id },
    })

    // 5) Send response
    res.status(StatusCodes.NO_CONTENT).json({
        status: "success",
        data: null,
    })
})
