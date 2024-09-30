import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';

const router = Router();

//router.get('/getNumeroDocument/:numberDocument', CompanyController.searchByNumberDocument);
router.post('/save', CompanyController.store);

export default router;