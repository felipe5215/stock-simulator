import { PrismaClient } from '@prisma/client';
import IUserBody from '../interfaces/user.interface';

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
