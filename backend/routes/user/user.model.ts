import mongoose, { type Document, Schema } from "mongoose"
import { UserRole } from "@/utils/enums"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
    name: string
    email: string
    password: string
    role: UserRole
    createdAt: Date
    updatedAt: Date
    complaintsSubmitted: mongoose.Types.ObjectId[]
    agencyId?: mongoose.Types.ObjectId
    responses: mongoose.Types.ObjectId[]
    resetPasswordToken?: string
    resetPasswordExpires?: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
                message: "Please enter a valid email",
            },
        },
        agencyId: {
            type: Schema.Types.ObjectId,
            ref: "Agency",
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false,
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.CITIZEN,
        },
        complaintsSubmitted: [
            {
                type: Schema.Types.ObjectId,
                ref: "Complaint",
            },
        ],
        responses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Response",
            },
        ],
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    {
        timestamps: true,
    },
)

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error: any) {
        next(error)
    }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.model<IUser>("User", userSchema)
