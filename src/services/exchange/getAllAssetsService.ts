import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllAssetsService = async () => {
  const exchangeStocks = await prisma.stocks.findMany();
  return exchangeStocks;
};
