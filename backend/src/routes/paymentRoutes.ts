import { Router } from 'express';
import { initiatePayment, getTransactions } from '../controllers/paymentController';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/initiate', auth as any, initiatePayment as any);
router.get('/history', auth as any, getTransactions as any);

export default router;
