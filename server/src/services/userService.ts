import { PrismaClient } from '@prisma/client';
import IUserBody from '../interfaces/user.interface';
import Exception from '../utils/http.exception';

const prisma = new PrismaClient();

export const createUserService = async (user: IUserBody) => {
  const createUser = await prisma.user.create({
    data: {
      email: user.email,
      password: user.password,
      Wallet: {
        create: {
          balance: 999.99,
        },
      },
    },
  });
  return createUser;
};

export const getAllUsersService = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

export const userLoginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Exception(404, 'Invalid email or password');
  }

  if (user.password !== password) {
    throw new Exception(401, 'Invalid email or password');
  }

  return user;
};
