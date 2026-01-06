import { Router } from 'express';
import { initiatePayment, getTransactions } from '../controllers/paymentController';

const router = Router();

router.post('/initiate', initiatePayment);
router.get('/history', getTransactions);

export default router;
