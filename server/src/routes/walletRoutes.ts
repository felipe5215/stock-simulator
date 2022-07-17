import { Router } from 'express';
import {
  getBalanceById,
  makeDeposit,
  makeWithdraw,
} from '../controllers/walletController';

const walletRoutes = Router();

walletRoutes.get('/saque', makeWithdraw);
walletRoutes.post('/deposito', makeDeposit);
walletRoutes.get('/:id', getBalanceById);

export default walletRoutes;
