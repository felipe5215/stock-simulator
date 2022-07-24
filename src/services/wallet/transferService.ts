import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import TransferOrder from '../../interfaces/transfer.interface';
import Exception from '../../utils/http.exception';

const prisma = new PrismaClient();

export const transferService = async (transferOrder: TransferOrder) => {
  const { clientId, to, amount } = transferOrder;

  const sender = await prisma.wallet.findUnique({
    where: { clientId: clientId },
  });
  const receiver = await prisma.wallet.findUnique({ where: { clientId: to } });

  if (!sender) {
    throw new Exception(StatusCodes.NOT_FOUND, 'Client not found');
  }
  if (!receiver) {
    throw new Exception(StatusCodes.NOT_FOUND, 'Recipient not found');
  }

  if (sender.balance - amount < 0) {
    throw new Exception(StatusCodes.CONFLICT, 'Not enough balance');
  }

  await prisma
    .$transaction([
      prisma.wallet.update({
        where: { clientId: clientId },
        data: { balance: sender.balance - amount },
      }),
      prisma.wallet.update({
        where: { clientId: to },
        data: { balance: receiver.balance + amount },
      }),
    ])
    .catch((err) => {
      throw new Exception(StatusCodes.SERVICE_UNAVAILABLE, err.message);
    })
    .finally(() => {
      prisma.$disconnect();
    });
};
