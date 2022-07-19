import { PrismaClient } from '.prisma/client';
import IOrder from '../interfaces/order.interface';
import Exception from '../utils/http.exception';

const prisma = new PrismaClient();

export const checkExchangeStocks = async (order: IOrder) => {
  const exchangeStocks = await prisma.stocks.findUnique({
    where: {
      CodAtivo: order.codAtivo,
    },
    select: {
      QtdeAtivo: true,
    },
  });
  return exchangeStocks;
};

export const buyStocksService = async (order: IOrder) => {
  const exchangeStocks = await checkExchangeStocks(order);

  if (exchangeStocks && exchangeStocks.QtdeAtivo < order.qtdeAtivo) {
    throw new Exception(
      400,
      'Nao ha estoque disponivel na exchange para realizar essa compra'
    );
  }
};
