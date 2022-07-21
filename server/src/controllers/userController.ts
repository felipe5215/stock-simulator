import { NextFunction, Request, Response } from 'express';
import IUserBody from '../interfaces/user.interface';
import {
  createUserService,
  getAllUsersService,
  userLoginService,
} from '../services/userService';
import { createToken } from '../utils/tokenUtils';

export const createUserController = async (req: Request, res: Response) => {
  const user: IUserBody = req.body;
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
  const { email, password } = req.body;
  try {
    const user = await userLoginService(email, password);
    const token = createToken(user);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
