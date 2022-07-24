import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Exception from '../utils/http.exception';
import { decodeToken, verifyToken } from '../utils/tokenUtils';

const validateParams = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  if (!authorization) {
    throw new Exception(StatusCodes.FORBIDDEN, 'Token not provided');
  }

  verifyToken(authorization);
  const clientIdFromToken = decodeToken(authorization);

  if (id !== clientIdFromToken) {
    throw new Exception(StatusCodes.FORBIDDEN, 'Invalid token');
  }

  next();
};

export default validateParams;
