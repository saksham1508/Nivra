import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import paymentRoutes from './routes/paymentRoutes';
import aaRoutes from './routes/aaRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'UP', timestamp: new Date() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/aa', aaRoutes);

app.listen(PORT, () => {
    console.log(`FinTech OS Backend running on port ${PORT}`);
});
