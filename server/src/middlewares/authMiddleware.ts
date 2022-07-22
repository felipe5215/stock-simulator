import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Exception from '../utils/http.exception';
import { verifyToken } from '../utils/tokenUtils';

const validateAuthentication = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Exception(StatusCodes.FORBIDDEN, 'Token not provided');
  }

  verifyToken(authorization);

  next();
};

export default validateAuthentication;
