import express from 'express';
const authRouter = express.Router();
import { isAuthenticated, login, logout, register, resetPassword, sendResetOTP, sendVerifyOTP, verifyAccount } from "../controllers/authController.js";
import { userAuth } from "../middlewares/userAuth.js"

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOTP);
authRouter.post('/verify-account', userAuth, verifyAccount);
authRouter.post('/isAuthenticated', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOTP);
authRouter.post('/reset-password', resetPassword);

export default authRouter;