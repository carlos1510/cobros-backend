import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const router = Router();

router.get('/', CompanyController.index);
router.post('/save', CompanyController.store);
router.put('/update/:id', CompanyController.update);
router.delete('/destroy/:id', CompanyController.destroy);

export default router;