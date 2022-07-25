import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import IOrder from '../../interfaces/order.interface';
import Exception from '../../utils/http.exception';
import { checkBalance } from '../wallet/checkBalance';
import { getAssetByIdService } from './getAssetByIdService';

const prisma = new PrismaClient();

export const sellStocksService = async (order: IOrder) => {
  const exchangeStock = await getAssetByIdService(order.assetId);

  const totalValue = exchangeStock.value * order.assetQtty;

  const clientBalance = await checkBalance(order.clientId);
  const checkAssets = await prisma.holdings.findFirst({
    where: {
      clientId: order.clientId,
      assetId: order.assetId,
    },
  });

  if (!checkAssets) {
    throw new Exception(StatusCodes.NOT_FOUND, 'Investment not found');
  }

  if (checkAssets?.assetQtty < order.assetQtty) {
    throw new Exception(StatusCodes.BAD_REQUEST, 'Not enough assets to sell');
  }

  await prisma
    .$transaction([
      prisma.stocks.update({
        where: {
          assetId: order.assetId,
        },
        data: {
          assetQtty: exchangeStock.assetQtty + order.assetQtty,
        },
      }),
      prisma.wallet.update({
        where: {
          clientId: order.clientId,
        },
        data: {
          balance: clientBalance.balance + order.assetQtty * totalValue,
        },
      }),
      prisma.holdings.update({
        where: {
          clientId_assetId: {
            clientId: order.clientId,
            assetId: order.assetId,
          },
        },
        data: {
          assetQtty: checkAssets?.assetQtty - order.assetQtty,
        },
      }),
    ])
    .catch((err) => {
      throw new Exception(StatusCodes.SERVICE_UNAVAILABLE, err.message);
    })
    .finally(() => {
      prisma.$disconnect();
    });
};
