import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const createConsent = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        // Mock AA Consent Artifact according to ReBIT specifications
        const consentId = uuidv4();
        const consentRequest = {
            consentId,
            status: 'PENDING',
            consentDetail: {
                consentTypes: ['TRANSACTIONS', 'PROFILE'],
                fetchTypes: ['ONETIME'],
                dataConsumer: { id: 'NIVRA-FIU-ID' },
                customer: { id: req.body.customerId || 'user@aa' },
                purpose: { code: '101', text: 'Wealth Management' },
                fips: [{ id: 'SBI-FIP-ID' }, { id: 'HDFC-FIP-ID' }],
                dataLife: { unit: 'MONTH', value: 36 },
                frequency: { unit: 'HOUR', value: 1 },
                dataFilter: [{ type: 'TRANSACTIONAMOUNT', operator: '>=', value: '1' }]
            },
            redirectUrl: 'https://nivra.ai/aa-callback'
        };

        // Save consent to DB
        await query(
            'INSERT INTO consents (user_id, consent_id, status) VALUES ($1, $2, $3)',
            [userId, consentId, 'PENDING']
        );

        console.log(`AA Consent Created: ${consentId} for user ${userId}`);

        res.status(201).json(consentRequest);
    } catch (error) {
        console.error('Create consent error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getConsentStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { consentId } = req.params;
        const userId = req.user?.id;

        const result = await query(
            'SELECT * FROM consents WHERE consent_id = $1 AND user_id = $2',
            [consentId, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Consent not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Get consent status error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const syncData = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        console.log(`Syncing data for user: ${userId}`);
        
        // Mock FIU Data Fetch flow
        // In reality, this would trigger a background job to fetch and decrypt data
        
        res.json({
            message: 'Data synchronization started',
            jobId: uuidv4()
        });
    } catch (error) {
        console.error('Sync data error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
