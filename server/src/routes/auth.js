import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/test', authenticate, getMe);

export default router;