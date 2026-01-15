import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { query } from '../config/db';

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
        
        // Check if user exists, if not create them
        const userCheck = await query('SELECT id FROM users WHERE phone_number = $1', [phoneNumber]);
        if (userCheck.rowCount === 0) {
            await query('INSERT INTO users (phone_number) VALUES ($1)', [phoneNumber]);
            console.log(`New user registered: ${phoneNumber}`);
        }

        // Mock OTP generation and sending via SMS
        console.log(`Sending OTP 123456 to ${phoneNumber}`);
        
        res.status(200).json({
            message: 'OTP sent successfully',
            success: true
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ error: 'Invalid phone number' });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { phoneNumber, otp } = verifyOtpSchema.parse(req.body);

        // Mock OTP check
        if (otp === '123456') {
            const userResult = await query('SELECT id FROM users WHERE phone_number = $1', [phoneNumber]);
            const user = userResult.rows[0];

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const token = jwt.sign(
                { id: user.id, phoneNumber }, 
                process.env.JWT_SECRET || 'fallback_secret', 
                { expiresIn: '7d' }
            );

            res.status(200).json({
                message: 'Login successful',
                token,
                user: { id: user.id, phoneNumber },
                success: true
            });
        } else {
            res.status(401).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(400).json({ error: 'Invalid request data' });
    }
};
