import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from '../models/User';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || '', {
        expiresIn: '30d',
    });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try
    {
        const { username, email, password, role } = req.body;

        if(!username || !email || !password)
        {
            res.status(400).json({ message: 'Please fill in all fields.' });
            return;
        }

        const userExists = await User.findOne({ email });
        if(userExists)
        {
            res.status(400).json({ message: 'User already exists.' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'student'
        });

        if(user)
        {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id.toString()),
            });
        }
        else
        {
            res.status(500).json({ message: 'Invalid user data.' });
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try 
    {
        const { email, password } = req.body;

        if(!email || !password)
        {
            res.status(400).json({ message: 'Please provide email and password.' });
            return;
        }

        const user = await User.findOne({ email });

        if(user && await bcrypt.compare(password, user.password as string))
        {
            res.status(200).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id.toString()),
            });
        }
        else
        {
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
}