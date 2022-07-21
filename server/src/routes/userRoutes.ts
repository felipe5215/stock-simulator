import { Router } from 'express';
import {
  createUserController,
  getAllUsers,
  userLogin,
} from '../controllers/userController';
import zodTest from '../controllers/zodController';

const userRoutes = Router();

userRoutes.get('/getUsers', getAllUsers);

userRoutes.post('/createUser', createUserController);

userRoutes.post('/login', userLogin);

userRoutes.post('/zod', zodTest);

export default userRoutes;
