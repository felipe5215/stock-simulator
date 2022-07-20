import { Router } from 'express';
import holdingRoutes from './holdingRoutes';
import userRoutes from './userRoutes';
import walletRoutes from './walletRoutes';

const routes = Router();

routes.use('/wallet', walletRoutes);

routes.use('/user', userRoutes);

routes.use('/exchange', holdingRoutes);

export default routes;
