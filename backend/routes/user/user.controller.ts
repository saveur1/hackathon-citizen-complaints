import { Request, Response, NextFunction } from 'express';
import { User } from '@/routes/user/user.model';
import { UserRole } from '@/utils/enums';
import { ErrorHandler, asyncCatch } from "@/middleware/errorHandler";

export const getAllUsers = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find().select('-password');
    res.status(200).json({
        success: true,
        data: {
            users
        }
    });
});

export const getUserById = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {
            user
        }
    });
});

export const updateUser = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, role } = req.body;
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // Validate role if provided
    if (role && !Object.values(UserRole).includes(role)) {
        return next(new ErrorHandler('Invalid role', 400));
    }

    // Check if email is already taken by another user
    if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler('Email is already taken', 400));
        }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            name: name || user.name,
            email: email || user.email,
            role: role || user.role
        },
        { new: true }
    ).select('-password');

    res.status(200).json({
        success: true,
        data: {
            user: updatedUser
        }
    });
});

export const deleteUser = asyncCatch(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // Prevent self-deletion
    if (userId === req.user._id.toString()) {
        return next(new ErrorHandler('You cannot delete your own account', 400));
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
}); 