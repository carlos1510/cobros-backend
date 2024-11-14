import { Router } from 'express';
import FeeController from '../controllers/FeeController';

const router = Router();

router.get('/:payDate', FeeController.index);
router.post('/save', FeeController.store);
router.put('/update/:id', FeeController.update);
router.delete('/destroy/:id', FeeController.destroy);

export default router;