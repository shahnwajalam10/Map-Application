import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { saveRoute, getSavedRoutes } from '../controllers/mapController.js';

const router = express.Router();

router.use(authenticate);


router.post('/routes', saveRoute);
router.get('/routes', getSavedRoutes);

export default router;