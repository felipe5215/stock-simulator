import { Router } from 'express';
import {
  createUserController,
  getAllUsers,
  userLogin,
} from '../controllers/userController';

const userRoutes = Router();

userRoutes.get('/getUsers', getAllUsers);

userRoutes.post('/createUser', createUserController);

userRoutes.post('/login', userLogin);

export default userRoutes;
