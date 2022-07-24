import { PrismaClient } from '@prisma/client';
import Exception from '../../utils/http.exception';

const prisma = new PrismaClient();

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
