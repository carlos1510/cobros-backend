import { Router } from 'express';
import ClientController from '../controllers/ClientController';

const router = Router();

router.get('/getNumeroDocument/:numberDocument', ClientController.searchByNumberDocument);
router.post('/save', ClientController.store);

export default router;