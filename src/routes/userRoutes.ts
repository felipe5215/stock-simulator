import { Router } from 'express';
import { createUserController } from '../controllers/user/createUser';
import { userLogin } from '../controllers/user/userLogin';

const userRoutes = Router();

userRoutes.post('/createUser', createUserController);

userRoutes.post('/login', userLogin);

export default userRoutes;
