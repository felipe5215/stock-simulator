import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import IUserBody from '../../interfaces/user.interface';
import userSchema from '../../interfaces/user.schema';
import { createUserService } from '../../services/user/createUserService';
import { createToken } from '../../utils/tokenUtils';
import ZodException from '../../utils/zod.exception';

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUserBody = req.body;

  try {
    userSchema.parse(user);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return next(new ZodException(StatusCodes.CONFLICT, e.issues));
    }
  }

  const createdUser = await createUserService(user);
  const token = createToken(createdUser.clientId);

  res.json({
    clientId: createdUser.clientId,
    token,
  });
};
