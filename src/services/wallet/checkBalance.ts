import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import Exception from '../../utils/http.exception';

const prisma = new PrismaClient();

export const checkBalance = async (clientId: string) => {
  const clientCurrInfo = await prisma.wallet
    .findUnique({ where: { clientId } })
    .then((client) => {
      if (!client) {
        throw new Exception(StatusCodes.NOT_FOUND, 'Client not found');
      }
      return client;
    });

  return clientCurrInfo;
};
