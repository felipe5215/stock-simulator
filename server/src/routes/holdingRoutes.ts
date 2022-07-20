import { Router } from 'express';
import { buyStocks } from '../controllers/holdingControllers';
import validateHoldingBody from '../middlewares/validateHoldingBody';

const holdingRoutes = Router();

holdingRoutes.use(validateHoldingBody);

holdingRoutes.post('/buy', buyStocks);

export default holdingRoutes;
