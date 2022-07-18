import { Request, Response, NextFunction } from 'express';
import Exception from '../utils/http.exception';

const validateBuy = (req: Request, _res: Response, next: NextFunction) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;

  if (!codCliente || !codAtivo || !qtdeAtivo) {
    throw new Exception(400, 'codCliente, codAtivo and qtdeAtivo are required');
  }

  if (
    typeof codCliente !== 'number' ||
    typeof codAtivo !== 'number' ||
    typeof qtdeAtivo !== 'number'
  ) {
    throw new Exception(
      400,
      'codCliente, codAtivo and qtdeAtivo must be numbers'
    );
  }

  next();
};

export default validateBuy;
