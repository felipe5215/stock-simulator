import { PrismaClient } from '.prisma/client';
import { StatusCodes } from 'http-status-codes';
import IOrder from '../interfaces/order.interface';
import Exception from '../utils/http.exception';

const prisma = new PrismaClient();

export const getAllAssetsService = async () => {
  const exchangeStocks = await prisma.stocks.findMany();
  return exchangeStocks;
};

export const getAssetByIdService = async (assetId: string) => {
  const asset = await prisma.stocks.findUnique({
    where: {
      assetId,
    },
  });
  if (!asset) {
    throw new Exception(StatusCodes.NOT_FOUND, 'Asset not found');
  }
  return asset;
};

export const buyStocksService = async (order: IOrder) => {
  const exchangeStock = await getAssetByIdService(order.assetId);

  const totalCost = exchangeStock.value * order.assetQtty;
  if (exchangeStock.assetQtty < order.assetQtty) {
    throw new Exception(
      StatusCodes.CONFLICT,
      'Not enough stocks available on exchange'
    );
  }

  const stockTransaction = async () => {
    return await prisma.$transaction(async (trx) => {
      const clientBalance = await trx.wallet.findUnique({
        where: {
          clientId: order.clientId,
        },
      });

      if (!clientBalance) {
        throw new Exception(StatusCodes.NOT_FOUND, 'Client not found');
      }

      if (clientBalance.balance < totalCost) {
        throw new Exception(StatusCodes.CONFLICT, 'Not enough balance');
      }

      await trx.wallet.update({
        where: {
          clientId: order.clientId,
        },
        data: {
          balance: clientBalance.balance - totalCost,
        },
      });

      await trx.stocks.update({
        where: {
          assetId: order.assetId,
        },
        data: {
          assetQtty: exchangeStock.assetQtty - order.assetQtty,
        },
      });

      const checkIfClientHasAsset = await trx.holdings.findFirst({
        where: {
          clientId: order.clientId,
          assetId: order.assetId,
        },
      });

      if (checkIfClientHasAsset) {
        await trx.holdings.update({
          where: {
            clientId_assetId: {
              clientId: order.clientId,
              assetId: order.assetId,
            },
          },
          data: {
            assetQtty: checkIfClientHasAsset.assetQtty + order.assetQtty,
          },
        });
      } else {
        await trx.holdings.create({
          data: {
            clientId: order.clientId,
            assetId: order.assetId,
            assetQtty: order.assetQtty,
          },
        });
      }
    });
  };

  const executeTransaction = async () => await stockTransaction();

  return executeTransaction()
    .catch((err) => {
      throw new Exception(StatusCodes.CONFLICT, err.message);
    })
    .finally(() => {
      prisma.$disconnect();
    });
};
