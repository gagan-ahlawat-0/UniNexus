import { Request, Response } from 'express';
import { User, IUser } from '../models/User';

// Custom interface that extends Express Request to include user
interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const getUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const user = await User.findById(req.user?._id).select('-password');
    
    if(user)
    {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        });
    }
    else
    {
        res.status(404).json({ message: 'User not found.' });
    }
};

export const updateUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const user = await User.findByIdAndUpdate(req.user?._id, req.body, { new: true }).select('-password');
    
    if(user)
    {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        });
    }
    else
    {
        res.status(404).json({ message: 'User not found.' });
    }
};

export const deleteUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const user = await User.findByIdAndDelete(req.user?._id);
    
    if(user)
    {
        res.json({ message: 'User deleted successfully.' });
    }
    else
    {
        res.status(404).json({ message: 'User not found.' });
    }
};

// Admin Only
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await User.find().select('-password');
    res.json(users);
};