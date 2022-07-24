import { Router } from 'express';
import { buyStocks } from '../controllers/exchange/buyStocks';
import { getAllAssets } from '../controllers/exchange/getAllAssets';
import { getAssetById } from '../controllers/exchange/getAssetsById';
import { sellStocks } from '../controllers/exchange/sellStocks';
import validateBody from '../middlewares/validateBody';

const exchangeRoutes = Router();

exchangeRoutes.get('/assets', getAllAssets);
exchangeRoutes.get('/assets/:assetId', getAssetById);

exchangeRoutes.use(validateBody);

exchangeRoutes.post('/buy', buyStocks);
exchangeRoutes.post('/sell', sellStocks);

export default exchangeRoutes;
