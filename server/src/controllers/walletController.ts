import { Request, Response } from 'express';
import IWithdrawOrder from '../interfaces/withdrawOrder.interface';

export const getBalanceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`O saldo da conta ${id} é R$ 100,00`);
};

export const makeDeposit = async (_req: Request, res: Response) => {
  res.send('makeDeposit');
};

export const makeWithdraw = async (req: Request, res: Response) => {
  const withdrawInfo: IWithdrawOrder = req.body;
  res.send(
    `${withdrawInfo.clientId} solicitou um saque de R$ ${withdrawInfo.amount}`
  );
};
