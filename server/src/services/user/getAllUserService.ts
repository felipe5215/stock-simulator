import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsersService = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};
