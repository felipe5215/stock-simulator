import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import IUserBody from '../interfaces/user.interface';
import {
  createUserService,
  getAllUsersService,
  userLoginService,
} from '../services/userService';
import { createToken } from '../utils/tokenUtils';
import ZodException from '../utils/zod.exception';

// declaring zod schema for request body validation
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
  const token = createToken(createdUser);

  res.json({ token });
};

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsersService();
  res.json(users);
};

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
    const token = createToken(loggedUser);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
