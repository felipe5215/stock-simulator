import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import IOrder from '../interfaces/order.interface';
import { buyStocksService } from '../services/holdingServices';
import ZodException from '../utils/zod.exception';

const stocksSchema = z
  .object({
    clientId: z.string(),
    assetId: z.string(),
    assetQtty: z.number(),
  })
  .strict();

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
    await buyStocksService(order);
    res.status(200).json({ message: `${order.assetQtty} ativos comprados` });
  } catch (err) {
    next(err);
  }
};

export const sellStocks = (_req: Request, res: Response) => {
  res.send('sell stocks');
};
