import { Router } from 'express';
import userRoutes from './userRoutes';
import walletRoutes from './walletRoutes';

const routes = Router();

routes.use('/conta', walletRoutes);

routes.use('/user', userRoutes);

export default routes;
