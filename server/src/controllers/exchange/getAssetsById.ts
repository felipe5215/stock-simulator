import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { getAssetByIdService } from '../../services/exchange/getAssetByIdService';

export const getAssetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { assetId } = req.params;
    const asset = await getAssetByIdService(assetId);
    res.status(StatusCodes.OK).json(asset);
  } catch (e) {
    return next(e);
  }
};
