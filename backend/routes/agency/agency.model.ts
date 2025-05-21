import mongoose, { type Document, Schema } from "mongoose"

export interface IAgency extends Document {
  name: string
  description: string
  contactEmail: string
  serviceCategories: string[]
}

const agencySchema = new Schema<IAgency>(
  {
    name: {
      type: String,
      required: [true, "Agency name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Agency description is required"],
    },
    contactEmail: {
      type: String,
      required: [true, "Contact email is required"],
      lowercase: true,
      validate: {
        validator: (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
        message: "Please enter a valid email",
      },
    },
    serviceCategories: [
      {
        type: String,
        required: [true, "At least one service category is required"],
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const Agency = mongoose.model<IAgency>("Agency", agencySchema)
