import { Router } from 'express';
import validateAuthentication from '../middlewares/authMiddleware';
import holdingRoutes from './holdingRoutes';
import userRoutes from './userRoutes';
import walletRoutes from './walletRoutes';

const routes = Router();

routes.use('/', userRoutes);

routes.use(validateAuthentication);

routes.use('/wallet', walletRoutes);

routes.use('/exchange', holdingRoutes);

export default routes;
