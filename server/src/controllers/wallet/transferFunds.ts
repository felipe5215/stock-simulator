import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import TransferOrder from '../../interfaces/transfer.interface';
import transferSchema from '../../interfaces/transfer.schema';
import { checkBalance } from '../../services/wallet/checkBalance';
import { transferService } from '../../services/wallet/transferService';
import ZodException from '../../utils/zod.exception';

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
