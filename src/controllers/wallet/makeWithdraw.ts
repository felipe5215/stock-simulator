import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import IBankOrder from '../../interfaces/bankorder.interface';
import orderSchema from '../../interfaces/order.schema';
import { withdrawService } from '../../services/wallet/withdrawService';
import ZodException from '../../utils/zod.exception';

export const makeWithdraw = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const withdrawInfo: IBankOrder = req.body;

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
