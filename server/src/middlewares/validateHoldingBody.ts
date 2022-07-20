import { Request, Response, NextFunction } from 'express';
import Exception from '../utils/http.exception';

const validateHoldingBody = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const {
    clientId: clientId,
    assetId: assetId,
    assetQtty: assetQtty,
  } = req.body;

  if (!clientId || !assetId || !assetQtty) {
    throw new Exception(400, 'clientId, assetId and assetQtty are required');
  }
  //TODO: refactor this to outside function
  if (
    typeof clientId !== 'string' ||
    typeof assetId !== 'string' ||
    typeof assetQtty !== 'number'
  ) {
    throw new Exception(400, 'clientId, assetId and assetQtty must be numbers');
  }

  next();
};

export default validateHoldingBody;
