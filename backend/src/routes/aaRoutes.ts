import { Router } from 'express';
import { createConsent, getConsentStatus, syncData } from '../controllers/aaController';

const router = Router();

router.post('/consent/create', createConsent);
router.get('/consent/:consentId', getConsentStatus);
router.post('/sync', syncData);

export default router;
