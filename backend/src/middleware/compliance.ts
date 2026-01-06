import { Request, Response, NextFunction } from 'express';
import { encrypt } from './security';

/**
 * RBI Compliance: Maintenance of Consent Logs
 * This middleware logs every access to financial data with a reference to the user's consent.
 */
export const logConsentAccess = (req: Request, res: Response, next: NextFunction) => {
    const consentId = req.headers['x-consent-id'];
    const userId = req.headers['x-user-id'];

    if (req.path.includes('/aa/data') && !consentId) {
        return res.status(403).json({ error: 'Consent ID required for financial data access' });
    }

    if (consentId) {
        console.log(`[CONSENT_LOG] User: ${userId} | Consent: ${consentId} | Resource: ${req.path} | Time: ${new Date().toISOString()}`);
        // In production, write this to a tamper-proof audit trail (e.g., Immutable DB or Signed Logs)
    }

    next();
};

/**
 * Data Minimization Utility
 * Ensures only requested fields are returned to the client
 */
export const sanitizeData = (data: any, allowedFields: string[]) => {
    const sanitized: any = {};
    allowedFields.forEach(field => {
        if (data[field] !== undefined) sanitized[field] = data[field];
    });
    return sanitized;
};
