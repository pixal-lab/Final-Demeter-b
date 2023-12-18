import { Router } from "express";

import { login, logout, profile, verifyToken, forgotPassword, NewPassword, getUserCookies, getCurrentUser } from '../controllers/login.controller.js'; // Login

import { authRequired } from '../middlewares/validateToken.js'

const router = Router();

// --------------------------- Login ------------------------------------- //
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', profile)
router.get('/verifyToken', verifyToken)
router.post('/resetPassword', forgotPassword);
router.post('/newPassword', NewPassword);
router.get('/getUserCookies', getUserCookies);
router.get('/getCurrentUser', getCurrentUser);


export default router;

