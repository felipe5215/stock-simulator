import { NextFunction, Request, Response } from 'express';
import { checkBalance } from '../../services/wallet/checkBalance';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';

export const getBalanceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const userWallet = await checkBalance(id);
    res.status(StatusCodes.OK).json(userWallet);
  } catch (error) {
    next(error);
  }
};
