import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import clientRoutes from './routes/clientRoutes';
import companyRoutes from './routes/companyRoutes';
import serviceRoutes from './routes/serviceRoutes';
import feeRoutes from './routes/feeRoutes';
import creditRoutes from './routes/creditRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/clients', clientRoutes);
router.use('/companies', companyRoutes);
router.use('/services', serviceRoutes);
router.use('/fees', feeRoutes);
router.use('/credits', creditRoutes);
router.use('/dashboard', dashboardRoutes);


export default router;