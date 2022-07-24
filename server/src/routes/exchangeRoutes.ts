import { Router } from 'express';
import {
  buyStocks,
  getAllAssets,
  getAssetById,
  sellStocks,
} from '../controllers/exchangeControllers';
import validateBody from '../middlewares/validateBody';
import validateParams from '../middlewares/validateParams';

const exchangeRoutes = Router();

exchangeRoutes.get('/assets', getAllAssets);
exchangeRoutes.get('/assets/:assetId', getAssetById);

exchangeRoutes.use(validateBody);

exchangeRoutes.post('/buy', buyStocks);
exchangeRoutes.post('/sell', sellStocks);

export default exchangeRoutes;
