import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import IBankOrder from '../../interfaces/bankorder.interface';
import Exception from '../../utils/http.exception';
import { checkBalance } from './checkBalance';

const prisma = new PrismaClient();

export const withdrawService = async (withdrawOrder: IBankOrder) => {
  const { clientId, amount } = withdrawOrder;
  const currBalance = await checkBalance(clientId).then((client) => {
    if (client.balance - amount < 0) {
      throw new Exception(StatusCodes.CONFLICT, 'Not enough balance');
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
