import stocksSchema from '../../interfaces/stocks.schema';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { buyStocksService } from '../../services/exchange/buyStockService';
import IOrder from '../../interfaces/order.interface';
import ZodException from '../../utils/zod.exception';

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
