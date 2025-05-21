import mongoose, { type Document, Schema } from "mongoose"

export interface IResponse extends Document {
  message: string
  internalNotes?: string
  createdAt: Date
  createdBy: mongoose.Types.ObjectId
  complaint: mongoose.Types.ObjectId
}

const responseSchema = new Schema<IResponse>(
  {
    message: {
      type: String,
      required: [true, "Response message is required"],
    },
    internalNotes: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    complaint: {
      type: Schema.Types.ObjectId,
      ref: "Complaint",
      required: [true, "Complaint reference is required"],
    },
  },
  {
    timestamps: true,
  },
)

export const Response = mongoose.model<IResponse>("Response", responseSchema)
