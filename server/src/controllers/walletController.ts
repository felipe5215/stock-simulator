import { NextFunction, Request, Response } from 'express';
import IBankOrder from '../interfaces/bankorder.interface';
import { depositService, withdrawService } from '../services/bankService';

export const getBalanceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`O saldo da conta ${id} é R$ 100,00`);
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
