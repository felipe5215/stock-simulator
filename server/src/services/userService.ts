import { PrismaClient } from '@prisma/client';
import IUserBody from '../interfaces/user.interface';

const prisma = new PrismaClient();

const createUserService = async (user: IUserBody) => {
  const createUser = await prisma.user.create({
    data: {
      email: user.email,
      password: user.password,
    },
  });
  return createUser;
};
export default createUserService;
