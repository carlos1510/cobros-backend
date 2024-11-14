import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.get('/', UserController.getUsers);
router.post('/save', UserController.store);
router.put('/update/:id', UserController.update);
router.delete('/destroy/:id', UserController.destroy);

export default router;