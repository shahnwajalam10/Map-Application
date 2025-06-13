// server/src/routes/protected.js
import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { saveRoute, getSavedRoutes } from '../controllers/mapController.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authenticate);

// Map routes
router.post('/routes', saveRoute);
router.get('/routes', getSavedRoutes);

export default router;