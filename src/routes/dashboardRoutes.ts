import { Router } from 'express';
import DashboardController from '../controllers/DashboardController';

const router = Router();

router.get('/:userId', DashboardController.getReporteGeneral);

export default router;