import { getAssestsByClientService } from '../../services/user/getAssetsByClientId';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import { Request, Response, NextFunction } from 'express';

export const getAssetsByClientId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const assets = await getAssestsByClientService(id);
    res.status(StatusCodes.OK).json(assets);
  } catch (error) {
    next(error);
  }
};
