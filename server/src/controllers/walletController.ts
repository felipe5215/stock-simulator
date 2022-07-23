import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import IBankOrder from '../interfaces/bankorder.interface';
import TransferOrder from '../interfaces/transfer.interface';
import {
  checkBalance,
  depositService,
  transferService,
  withdrawService,
} from '../services/walletService';
import ZodException from '../utils/zod.exception';

// declaring order schema to compare against request body for validation
const orderSchema = z
  .object({
    clientId: z.string(),
    amount: z.number().positive(),
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

const transferSchema = z
  .object({
    clientId: z.string(),
    to: z.string(),
    amount: z.number().positive(),
  })
  .strict();

export const transferFunds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transferInfo: TransferOrder = req.body;

  try {
    transferSchema.parse(transferInfo);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return next(new ZodException(StatusCodes.CONFLICT, e.issues));
    }
  }

  try {
    await transferService(transferInfo);
    const newBalance = await checkBalance(transferInfo.clientId);
    res.json({
      message: `You transferred R$ ${transferInfo.amount} to ${transferInfo.to}`,
      balance: `Your new balance is R$ ${newBalance.balance}`,
    });
  } catch (error) {
    next(error);
  }
};
