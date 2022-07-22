import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import IBankOrder from '../interfaces/bankorder.interface';
import {
  checkBalance,
  depositService,
  withdrawService,
} from '../services/bankService';
import ZodException from '../utils/zod.exception';

// declaring order schema to compare against request body for validation
const orderSchema = z
  .object({
    clientId: z.string(),
    amount: z.number(),
  })
  .strict();

export const getBalanceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userWallet = await checkBalance(id);
  res.status(StatusCodes.OK).json(userWallet);
};

export const makeDeposit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const depositInfo: IBankOrder = req.body;

  // zod shenanigans to validate request body
  try {
    orderSchema.parse(depositInfo);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return next(new ZodException(StatusCodes.CONFLICT, e.issues));
    }
  }

  const deposit = await depositService(depositInfo);
  res.json(deposit);
};

export const makeWithdraw = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const withdrawInfo: IBankOrder = req.body;

  // zod shenanigans to validate request body
  try {
    orderSchema.parse(withdrawInfo);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return next(new ZodException(StatusCodes.CONFLICT, e.issues));
    }
  }

  try {
    const withdraw = await withdrawService(withdrawInfo);
    res.json(withdraw);
  } catch (error) {
    return next(error);
  }
};
