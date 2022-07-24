import { Router } from 'express';
import {
  getAssetsByClientId,
  getBalanceById,
  makeDeposit,
  makeWithdraw,
  transferFunds,
} from '../controllers/walletController';
import validateParams from '../middlewares/validateParams';

const walletRoutes = Router();

walletRoutes.get('/:id', validateParams, getBalanceById);
walletRoutes.get('/assets/:id', validateParams, getAssetsByClientId);

walletRoutes.post('/withdraw', makeWithdraw);
walletRoutes.post('/deposit', makeDeposit);
walletRoutes.post('/transfer', transferFunds);

export default walletRoutes;
