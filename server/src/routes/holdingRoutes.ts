import { Router } from 'express';
import { buyStocks, sellStocks } from '../controllers/holdingControllers';

const holdingRoutes = Router();

holdingRoutes.post('/buy', buyStocks);
holdingRoutes.post('/sell', sellStocks);

export default holdingRoutes;
