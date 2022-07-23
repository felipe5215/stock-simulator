import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Exception from '../utils/http.exception';
import { decodeToken, verifyToken } from '../utils/tokenUtils';

const validateAuthentication = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const clientId = req.body.clientId;

  if (!authorization) {
    throw new Exception(StatusCodes.FORBIDDEN, 'Token not provided');
  }

  verifyToken(authorization);
  const clientIdFromToken = decodeToken(authorization);

  if (clientId !== clientIdFromToken) {
    throw new Exception(StatusCodes.FORBIDDEN, 'Invalid token');
  }

  next();
};

export default validateAuthentication;
