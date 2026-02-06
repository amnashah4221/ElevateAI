import express from 'express';
import { loginUser, registerUser, refreshToken } from '../controllers/authController.js';

const router = express.Router();


// Email/password routes
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);

export default router;
