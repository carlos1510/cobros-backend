import { Router } from 'express';
import FeeController from '../controllers/FeeController';

const router = Router();

router.get('/:payDate', FeeController.index);
router.get('/:creditId/findPayments', FeeController.findPaymentsByCredit);
router.post('/save', FeeController.store);
router.put('/update/:id', FeeController.update);
router.delete('/destroy/:id', FeeController.destroy);

export default router;