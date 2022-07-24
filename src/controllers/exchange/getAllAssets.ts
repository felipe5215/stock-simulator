import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getAllAssetsService } from '../../services/exchange/getAllAssetsService';

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
