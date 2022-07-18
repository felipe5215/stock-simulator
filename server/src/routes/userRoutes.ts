import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import createUserController from '../controllers/userController';

const userRoutes = Router();

const prisma = new PrismaClient();

userRoutes.post('/create', createUserController);

userRoutes.get('/', async (_request, response) => {
  const users = await prisma.user.findMany();
  response.json(users);
});

export default userRoutes;
