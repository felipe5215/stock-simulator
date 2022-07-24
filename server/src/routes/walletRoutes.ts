import { Router } from 'express';
import { getAssetsByClientId } from '../controllers/wallet/getAssetsByClient';
import { getBalanceById } from '../controllers/wallet/getBalanceById';
import { makeDeposit } from '../controllers/wallet/makeDeposit';
import { makeWithdraw } from '../controllers/wallet/makeWithdraw';
import { transferFunds } from '../controllers/wallet/transferFunds';
import validateParams from '../middlewares/validateParams';

const walletRoutes = Router();

walletRoutes.get('/:id', validateParams, getBalanceById);
walletRoutes.get('/assets/:id', validateParams, getAssetsByClientId);

walletRoutes.post('/withdraw', makeWithdraw);
walletRoutes.post('/deposit', makeDeposit);
walletRoutes.post('/transfer', transferFunds);

export default walletRoutes;
