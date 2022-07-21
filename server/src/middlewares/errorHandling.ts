import { NextFunction, Request, Response } from 'express';
import Exception from '../utils/http.exception';
import ZodException from '../utils/zod.exception';

const errorHandler = (
  error: Exception | ZodException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { status, messages } = error;
  res.status(status || 500).json({
    [Array.isArray(error.messages) ? 'Errors' : 'Error']:
      messages || 'Something went terribly wrong',
  });
};

export default errorHandler;
