import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import IUserBody from '../../interfaces/user.interface';
import { userLoginService } from '../../services/user/userLoginService';
import { createToken } from '../../utils/tokenUtils';
import ZodException from '../../utils/zod.exception';

// declaring zod schema for request body validation
const userSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();

export const userLogin = async (
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

  try {
    const loggedUser = await userLoginService(user.email, user.password);
    const token = createToken(loggedUser.clientId);
    res.json({ clientId: loggedUser.clientId, token: token });
  } catch (error) {
    next(error);
  }
};
