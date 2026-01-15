import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { query } from '../config/db';
import { AuthRequest } from '../middleware/auth';

const paymentSchema = z.object({
    amount: z.number().positive(),
    vpa: z.string().email(), // Virtual Payment Address e.g. user@okaxis
    merchantName: z.string().optional(),
});

export const initiatePayment = async (req: AuthRequest, res: Response) => {
    try {
        const { amount, vpa, merchantName } = paymentSchema.parse(req.body);
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        // In a real scenario, we would call the NPCI/PSP API here
        const upiTxnId = `TXN-${uuidv4().substring(0, 8).toUpperCase()}`;

        // Save to Database
        await query(
            'INSERT INTO transactions (user_id, txn_type, amount, merchant_name, upi_transaction_id, status) VALUES ($1, $2, $3, $4, $5, $6)',
            [userId, 'DEBIT', amount, merchantName || vpa, upiTxnId, 'PENDING']
        );

        console.log(`Payment initiated: ${amount} to ${vpa} [ID: ${upiTxnId}]`);

        res.status(200).json({
            message: 'Payment initiated',
            transactionId: upiTxnId,
            status: 'PENDING',
            success: true
        });

        // Simulate successful callback after 2 seconds
        setTimeout(async () => {
            console.log(`Webhook received: ${upiTxnId} SUCCESS`);
            await query('UPDATE transactions SET status = $1 WHERE upi_transaction_id = $2', ['SUCCESS', upiTxnId]);
        }, 2000);

    } catch (error) {
        console.error('Payment initiation error:', error);
        res.status(400).json({ error: 'Invalid payment details' });
    }
};

export const getTransactions = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const result = await query(
            'SELECT * FROM transactions WHERE user_id = $1 ORDER BY transaction_date DESC',
            [userId]
        );

        res.json({ transactions: result.rows });
    } catch (error) {
        console.error('Get transactions error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
