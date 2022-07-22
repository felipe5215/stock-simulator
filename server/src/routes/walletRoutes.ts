import { Router } from 'express';
import {
  getBalanceById,
  makeDeposit,
  makeWithdraw,
} from '../controllers/walletController';

const walletRoutes = Router();

walletRoutes.post('/withdraw', makeWithdraw);
walletRoutes.post('/deposit', makeDeposit);
walletRoutes.get('/:id', getBalanceById);

export default walletRoutes;
