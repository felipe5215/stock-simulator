import { NextFunction, Request, Response } from 'express';
import Exception from '../utils/http.exception';
import { verifyToken } from '../utils/tokenUtils';

const validateAuthentication = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Exception(401, 'Unauthorized');
  }

  verifyToken(authorization);

  next();
};

export default validateAuthentication;
