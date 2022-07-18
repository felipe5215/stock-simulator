import { Request, Response } from 'express';
import IUserBody from '../interfaces/user.interface';
import createUserService from '../services/userService';

const createUserController = async (req: Request, res: Response) => {
  const user: IUserBody = req.body;
  const createUser = await createUserService(user);

  res.json(createUser);
};
export default createUserController;
