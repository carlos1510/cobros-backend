import { Router } from 'express';
import CreditController from '../controllers/CreditController';

const router = Router();

router.get('/creditsPay', CreditController.listCreditPay);
router.get('/date/:creditDate', CreditController.index);
router.post('/save', CreditController.store);
router.put('/update/:id', CreditController.update);
router.delete('/destroy/:id', CreditController.destroy);

export default router;