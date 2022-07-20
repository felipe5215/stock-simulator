import { NextFunction, Request, Response } from 'express';
import IOrder from '../interfaces/order.interface';
import { buyStocksService } from '../services/holdingServices';

export const buyStocks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const order: IOrder = req.body;

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
