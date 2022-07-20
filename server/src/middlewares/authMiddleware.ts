import { NextFunction, Request, Response } from 'express';

const validateAuthentication = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log('validateAuthentication');
  next();
};

export default validateAuthentication;
