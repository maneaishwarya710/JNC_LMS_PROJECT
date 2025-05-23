import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter=express.Router();

userRouter.post('/login', UserController.login);
userRouter.post('/register', UserController.register);
userRouter.get('/get/:id', UserController.findUserById);

export default userRouter;
