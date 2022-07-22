import { Router } from 'express';
import {
  getBalanceById,
  makeDeposit,
  makeWithdraw,
  transferFunds,
} from '../controllers/walletController';

const walletRoutes = Router();

walletRoutes.get('/:id', getBalanceById);
walletRoutes.post('/withdraw', makeWithdraw);
walletRoutes.post('/deposit', makeDeposit);
walletRoutes.post('/transfer', transferFunds);

export default walletRoutes;
