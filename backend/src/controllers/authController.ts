import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const loginSchema = z.object({
    phoneNumber: z.string().min(10).max(15),
});

const verifyOtpSchema = z.object({
    phoneNumber: z.string().min(10).max(15),
    otp: z.string().length(6),
});

export const login = async (req: Request, res: Response) => {
    try {
        const { phoneNumber } = loginSchema.parse(req.body);
        
        // Mock OTP generation and sending via SMS
        console.log(`Sending OTP to ${phoneNumber}`);
        
        res.status(200).json({
            message: 'OTP sent successfully',
            success: true
        });
    } catch (error) {
        res.status(400).json({ error: 'Invalid phone number' });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { phoneNumber, otp } = verifyOtpSchema.parse(req.body);

        // Mock OTP check
        if (otp === '123456') {
            const token = jwt.sign(
                { phoneNumber }, 
                process.env.JWT_SECRET || 'fallback_secret', 
                { expiresIn: '7d' }
            );

            res.status(200).json({
                message: 'Login successful',
                token,
                success: true
            });
        } else {
            res.status(401).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Invalid request data' });
    }
};
