import { Router } from 'express';
import holdingRoutes from './holdingRoutes';
import userRoutes from './userRoutes';
import walletRoutes from './walletRoutes';

const routes = Router();

routes.use('/conta', walletRoutes);

routes.use('/user', userRoutes);

routes.use('/investimentos', holdingRoutes);

export default routes;
