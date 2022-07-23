import { Router } from 'express';
import { createUserController, userLogin } from '../controllers/userController';

const userRoutes = Router();

userRoutes.post('/createUser', createUserController);

userRoutes.post('/login', userLogin);

export default userRoutes;
