import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import ZodException from '../../utils/zod.exception';
import { depositService } from '../../services/wallet/depositService';
import IBankOrder from '../../interfaces/bankorder.interface';
import orderSchema from '../../interfaces/order.schema';

export const makeDeposit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const depositInfo: IBankOrder = req.body;

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
