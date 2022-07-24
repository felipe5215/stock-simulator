import { Router } from 'express';
import exchangeRoutes from './exchangeRoutes';
import userRoutes from './userRoutes';
import walletRoutes from './walletRoutes';

const routes = Router();

routes.use('/', userRoutes);

routes.use('/exchange', exchangeRoutes);

routes.use('/wallet', walletRoutes);

export default routes;
