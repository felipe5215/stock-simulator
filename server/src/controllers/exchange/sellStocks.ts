import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import { z } from 'zod';
import IOrder from '../../interfaces/order.interface';
import stocksSchema from '../../interfaces/stocks.schema';
import { sellStocksService } from '../../services/exchange/sellStockService';
import ZodException from '../../utils/zod.exception';

export const sellStocks = async (
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
    const sellStocksOrder = await sellStocksService(order);
    res.status(StatusCodes.OK).json(sellStocksOrder);
  } catch (err) {
    next(err);
  }
};
