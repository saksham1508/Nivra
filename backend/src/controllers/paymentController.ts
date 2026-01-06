import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const paymentSchema = z.object({
    amount: z.number().positive(),
    vpa: z.string().email(), // Virtual Payment Address e.g. user@okaxis
    merchantName: z.string().optional(),
});

export const initiatePayment = async (req: Request, res: Response) => {
    try {
        const { amount, vpa, merchantName } = paymentSchema.parse(req.body);
        
        // In a real scenario, we would call the NPCI/PSP API here
        const upiTxnId = `TXN-${uuidv4().substring(0, 8).toUpperCase()}`;

        // Mock event-driven logging (Emit to Kafka/PubSub in production)
        console.log(`Payment initiated: ${amount} to ${vpa} [ID: ${upiTxnId}]`);

        res.status(200).json({
            message: 'Payment initiated',
            transactionId: upiTxnId,
            status: 'PENDING',
            success: true
        });

        // Simulate successful callback after 2 seconds
        setTimeout(() => {
            console.log(`Webhook received: ${upiTxnId} SUCCESS`);
        }, 2000);

    } catch (error) {
        res.status(400).json({ error: 'Invalid payment details' });
    }
};

export const getTransactions = async (req: Request, res: Response) => {
    // Mock data for MVP
    const transactions = [
        {
            id: uuidv4(),
            amount: 500.00,
            vpa: 'zomato@okaxis',
            type: 'DEBIT',
            category: 'Food',
            date: new Date().toISOString(),
            status: 'SUCCESS'
        },
        {
            id: uuidv4(),
            amount: 2000.00,
            vpa: 'landlord@upi',
            type: 'DEBIT',
            category: 'Rent',
            date: new Date().toISOString(),
            status: 'SUCCESS'
        }
    ];

    res.json({ transactions });
};
