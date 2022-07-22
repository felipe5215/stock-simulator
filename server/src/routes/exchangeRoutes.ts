import { Router } from 'express';
import {
  buyStocks,
  getAllAssets,
  getAssetById,
  sellStocks,
} from '../controllers/exchangeControllers';
import validateAuthentication from '../middlewares/authMiddleware';

const exchangeRoutes = Router();

exchangeRoutes.get('/assets', getAllAssets);
exchangeRoutes.get('/assets/:assetId', getAssetById);

exchangeRoutes.use(validateAuthentication);

exchangeRoutes.post('/buy', buyStocks);
exchangeRoutes.post('/sell', sellStocks);

export default exchangeRoutes;
