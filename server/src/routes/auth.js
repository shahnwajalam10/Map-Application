// server/src/routes/auth.js
import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route (test authentication)
router.get('/test', authenticate, getMe);

export default router;