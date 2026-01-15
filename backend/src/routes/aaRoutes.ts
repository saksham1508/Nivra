import { Router } from 'express';
import { createConsent, getConsentStatus, syncData } from '../controllers/aaController';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/consent/create', auth as any, createConsent as any);
router.get('/consent/:consentId', auth as any, getConsentStatus as any);
router.post('/sync', auth as any, syncData as any);

export default router;
