import { Router } from 'express';
import walletRoutes from './walletRoutes';

const routes = Router();

routes.use('/conta', walletRoutes);

export default routes;
