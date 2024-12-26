import { Router } from 'express';
import ServiceController from '../controllers/ServiceController';

const router = Router();

router.get('/:userId', ServiceController.index);
router.post('/save', ServiceController.store);
router.put('/update/:id', ServiceController.update);
router.delete('/destroy/:id', ServiceController.destroy);

export default router;