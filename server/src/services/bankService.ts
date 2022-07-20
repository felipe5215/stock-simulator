import { PrismaClient } from '@prisma/client';
import IBankOrder from '../interfaces/bankorder.interface';
import Exception from '../utils/http.exception';

const prisma = new PrismaClient();

export const checkBalance = async (clientId: string, amount: number) => {
  const balance = await prisma.wallet
    .findUnique({ where: { clientId } })
    .then((client) => {
      if (!client) {
        throw new Exception(404, 'Client not found');
      }
      if (client.balance < amount) {
        throw new Exception(400, 'Not enough balance');
      }
      return client.balance;
    });
  return balance;
};

export const withdrawService = async (withdrawOrder: IBankOrder) => {
  const { clientId, amount } = withdrawOrder;
  const currBalance = await checkBalance(clientId, amount);
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
  const currBalance = await checkBalance(clientId, amount);
  const deposit = await prisma.wallet.update({
    where: {
      clientId,
    },
    data: {
      balance: currBalance + Math.abs(amount),
    },
  });

  return deposit;
};
