import express from 'express';
import { loginUser, registerUser, refreshToken, updateRoles, getRoles, getprofile, updateProfile, getexperiencelevel, updatepassword, deleteAccount } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();


// Email/password routes
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.put('/updateroles', protect,updateRoles);
router.get('/getroles', protect, getRoles);
router.get('/getprofile', protect, getprofile);
router.put('/updateprofile', protect, updateProfile);
router.get('/getexplevel', getexperiencelevel);
router.put('/changepassword', protect, updatepassword);
router.delete('/deleteaccount', protect, deleteAccount);

export default router;
