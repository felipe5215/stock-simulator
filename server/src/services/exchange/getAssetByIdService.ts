import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import Exception from '../../utils/http.exception';

const prisma = new PrismaClient();

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
