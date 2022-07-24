import { createToken } from '../../utils/tokenUtils';
import ZodException from '../../utils/zod.exception';
import { z } from 'zod/lib';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUserBody from '../../interfaces/user.interface';
import { createUserService } from '../../services/user/createUserService';

const userSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .strict();

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUserBody = req.body;

  // match our declared schema against request body using zod
  try {
    userSchema.parse(user);
  } catch (e) {
    if (e instanceof z.ZodError) {
      // if validation fails, wrap the error and pass it to error handling
      // middleware
      return next(new ZodException(StatusCodes.CONFLICT, e.issues));
    }
  }

  const createdUser = await createUserService(user);
  const token = createToken(createdUser.clientId);

  res.json({ token });
};
