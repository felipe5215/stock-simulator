import { PrismaClient } from '@prisma/client';
import IBankOrder from '../interfaces/bankorder.interface';
import Exception from '../utils/http.exception';

const prisma = new PrismaClient();

export const checkBalance = async (clientId: string) => {
  const clientCurrInfo = await prisma.wallet
    .findUnique({ where: { clientId } })
    .then((client) => {
      if (!client) {
        throw new Exception(404, 'Client not found');
      }
      return client;
    });

  return clientCurrInfo;
};

export const withdrawService = async (withdrawOrder: IBankOrder) => {
  const { clientId, amount } = withdrawOrder;
  const currBalance = await checkBalance(clientId).then((client) => {
    if (client.balance - amount < 0) {
      throw new Exception(400, 'Not enough balance');
    }
    return client.balance;
  });

  const withdraw = await prisma.wallet.update({
    where: {
      clientId,
    },
    data: {
      balance: currBalance - Math.abs(amount),
    },
  });

  return withdraw;
};

export const depositService = async (depositOrder: IBankOrder) => {
  const { clientId, amount } = depositOrder;
  const lastBalance = await checkBalance(clientId);
  const deposit = await prisma.wallet.update({
    where: {
      clientId,
    },
    data: {
      balance: lastBalance.balance + Math.abs(amount),
    },
  });

  return deposit;
};
