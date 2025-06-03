import express from 'express';
const userRouter = express.Router();
import { userAuth } from "../middlewares/userAuth.js"
import { getUserData } from '../controllers/userController.js';


userRouter.post('/get', userAuth, getUserData);

export default userRouter;