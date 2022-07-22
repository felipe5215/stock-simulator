import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import IOrder from '../interfaces/order.interface';
import {
  buyStocksService,
  getAllAssetsService,
  getAssetByIdService,
} from '../services/exchangeServices';
import ZodException from '../utils/zod.exception';

const stocksSchema = z
  .object({
    clientId: z.string(),
    assetId: z.string(),
    assetQtty: z.number().positive().int(),
  })
  .strict();

export const getAllAssets = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exchangeStocks = await getAllAssetsService();
    res.status(StatusCodes.OK).json(exchangeStocks);
  } catch (e) {
    return next(e);
  }
};

export const getAssetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { assetId } = req.params;
    const asset = await getAssetByIdService(assetId);
    res.status(StatusCodes.OK).json(asset);
  } catch (e) {
    return next(e);
  }
};

export const buyStocks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const order: IOrder = req.body;

  try {
    stocksSchema.parse(order);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return next(new ZodException(StatusCodes.CONFLICT, err.issues));
    }
  }

  try {
    const buyStocksOrder = await buyStocksService(order);
    res.status(StatusCodes.OK).json(buyStocksOrder);
  } catch (err) {
    next(err);
  }
};

export const sellStocks = (_req: Request, res: Response) => {
  res.send('sell stocks');
};
