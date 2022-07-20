import { NextFunction, Request, Response } from 'express';
import IBankOrder from '../interfaces/bankorder.interface';
import {
  checkBalance,
  depositService,
  withdrawService,
} from '../services/bankService';

export const getBalanceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const userWallet = await checkBalance(id);
  res.status(200).json(userWallet);
};

export const makeDeposit = async (req: Request, res: Response) => {
  const depositInfo: IBankOrder = req.body;
  const deposit = await depositService(depositInfo);
  res.json(deposit);
};

export const makeWithdraw = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const withdrawInfo: IBankOrder = req.body;
  try {
    const withdraw = await withdrawService(withdrawInfo);
    res.json(withdraw);
  } catch (error) {
    next(error);
  }
};
