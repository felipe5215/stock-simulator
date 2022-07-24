import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import TransferOrder from '../../interfaces/transfer.interface';
import Exception from '../../utils/http.exception';

const prisma = new PrismaClient();

export const transferService = async (transferOrder: TransferOrder) => {
  const { clientId, to, amount } = transferOrder;

  const transfer = async () => {
    return await prisma.$transaction(async (trx) => {
      const sender = await trx.wallet.findUnique({
        where: { clientId: clientId },
      });
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
          clientId: clientId,
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
