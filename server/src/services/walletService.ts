import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import IBankOrder from '../interfaces/bankorder.interface';
import TransferOrder from '../interfaces/transfer.interface';
import Exception from '../utils/http.exception';

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

export const transferService = async (transferOrder: TransferOrder) => {
  const { from, to, amount } = transferOrder;

  console.log(from, to, amount);

  const transfer = async () => {
    return await prisma.$transaction(async (trx) => {
      const sender = await trx.wallet.findUnique({ where: { clientId: from } });
      const receiver = await trx.wallet.findUnique({ where: { clientId: to } });

      if (!sender) {
        throw new Exception(StatusCodes.NOT_FOUND, 'Client not found');
      }
      if (!receiver) {
        throw new Exception(StatusCodes.NOT_FOUND, 'Recipient not found');
      }

      if (sender.balance - amount < 0) {
        throw new Exception(StatusCodes.CONFLICT, 'Not enough balance');
      }

      await trx.wallet.update({
        where: {
          clientId: from,
        },
        data: {
          balance: sender.balance - amount,
        },
      });

      await trx.wallet.update({
        where: {
          clientId: to,
        },
        data: {
          balance: receiver.balance + amount,
        },
      });
    });
  };

  const executeTransfer = async () => await transfer();

  return executeTransfer()
    .catch((err) => {
      throw new Exception(StatusCodes.CONFLICT, err.message);
    })
    .finally(() => {
      prisma.$disconnect();
    });
};
