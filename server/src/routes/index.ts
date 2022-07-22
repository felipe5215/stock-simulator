import { Router } from 'express';
import validateAuthentication from '../middlewares/authMiddleware';
import exchangeRoutes from './exchangeRoutes';
import userRoutes from './userRoutes';
import walletRoutes from './walletRoutes';

const routes = Router();

routes.use('/', userRoutes);

routes.use('/exchange', exchangeRoutes);

routes.use(validateAuthentication);

routes.use('/wallet', walletRoutes);

export default routes;
