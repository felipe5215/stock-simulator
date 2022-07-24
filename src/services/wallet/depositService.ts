import { PrismaClient } from '@prisma/client';
import IBankOrder from '../../interfaces/bankorder.interface';
import { checkBalance } from './checkBalance';

const prisma = new PrismaClient();

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
