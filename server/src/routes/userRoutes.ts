import { Router } from 'express';
import createUserController from '../controllers/userController';
import { getAllUsersService } from '../services/userService';

const userRoutes = Router();

userRoutes.get('/', getAllUsersService);

userRoutes.post('/create', createUserController);

export default userRoutes;
