import { userLoginService } from '../../services/user/userLoginService';
import IUserBody from '../../interfaces/user.interface';
import { createToken } from '../../utils/tokenUtils';
import { z } from 'zod';
import ZodException from '../../utils/zod.exception';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import { Request, Response, NextFunction } from 'express';

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
