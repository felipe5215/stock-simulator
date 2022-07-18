import { NextFunction, Request, Response } from 'express';
import Exception from '../utils/http.exception';

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { status, message } = error as Exception;
  res.status(status || 500).json({ message: message || 'Algo deu errado' });
};

export default errorHandler;
