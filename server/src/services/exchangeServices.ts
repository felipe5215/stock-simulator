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
  const exchangeStocks = await getAssetByIdService(order.assetId);
  console.log(
    `exchange qtty is ${exchangeStocks.assetQtty}, asset price is ${
      exchangeStocks.value
    }, your total cost would be ${exchangeStocks.value * order.assetQtty})`
  );
  if (exchangeStocks.assetQtty < order.assetQtty) {
    throw new Exception(
      StatusCodes.CONFLICT,
      'Not enough stocks available on exchange'
    );
  }

  return exchangeStocks;
};
