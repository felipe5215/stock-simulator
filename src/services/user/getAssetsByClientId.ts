import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAssestsByClientService = async (clientId: string) => {
  const assets = await prisma.holdings.findMany({
    where: {
      clientId,
    },
    include: {
      Asset: true,
    },
  });
  return assets;
};
