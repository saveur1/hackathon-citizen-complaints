import mongoose, { type Document, Schema } from "mongoose"
import { ComplaintStatus } from "@/utils/enums"

export interface IComplaint extends Document {
    title: string
    description: string
    location: string
    status: ComplaintStatus
    createdAt: Date
    updatedAt: Date
    submittedBy: mongoose.Types.ObjectId
    handledBy: mongoose.Types.ObjectId
    attachments: mongoose.Types.ObjectId[]
    responses: mongoose.Types.ObjectId[]
}

const complaintSchema = new Schema<IComplaint>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        location: {
            type: String,
            required: [true, "Location is required"],
        },
        status: {
            type: String,
            enum: Object.values(ComplaintStatus),
            default: ComplaintStatus.SUBMITTED,
        },
        submittedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        handledBy: {
            type: Schema.Types.ObjectId,
            ref: "Agency",
        },
        attachments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Attachment",
        },
        ],
        responses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Response",
        },
        ],
    },
    {
        timestamps: true,
    },
)

// Index for faster queries
complaintSchema.index({ category: 1, status: 1 })
complaintSchema.index({ submittedBy: 1 })
complaintSchema.index({ handledBy: 1 })

export const Complaint = mongoose.model<IComplaint>("Complaint", complaintSchema)
