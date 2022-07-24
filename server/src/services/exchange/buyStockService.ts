import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import IOrder from '../../interfaces/order.interface';
import Exception from '../../utils/http.exception';
import { checkBalance } from '../wallet/checkBalance';
import { getAssetByIdService } from './getAssetByIdService';

const prisma = new PrismaClient();

export const buyStocksService = async (order: IOrder) => {
  // preliminary checks to verify transaction success
  // check if there is enough stock on exchange
  const exchangeStock = await getAssetByIdService(order.assetId);

  // check total cost of transaction
  const totalCost = exchangeStock.value * order.assetQtty;
  if (exchangeStock.assetQtty < order.assetQtty) {
    throw new Exception(
      StatusCodes.CONFLICT,
      'Not enough stocks available on exchange'
    );
  }
  // check if client has enough funds
  const clientBalance = await checkBalance(order.clientId);
  if (!clientBalance) {
    throw new Exception(StatusCodes.NOT_FOUND, 'Client not found');
  }
  if (clientBalance.balance < totalCost) {
    throw new Exception(
      StatusCodes.CONFLICT,
      'Client does not have enough funds'
    );
  }

  // in the transaction is has to be decided if client has already bought this
  // asset is it the first time.
  const checkIfClientHasAsset = await prisma.holdings.findFirst({
    where: {
      clientId: order.clientId,
      assetId: order.assetId,
    },
  });

  const stockTransaction = async () => {
    return await prisma.$transaction(async (trx) => {
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

  return await stockTransaction()
    .catch((err) => {
      throw new Exception(StatusCodes.SERVICE_UNAVAILABLE, err.message);
    })
    .finally(() => {
      prisma.$disconnect();
    });
};
