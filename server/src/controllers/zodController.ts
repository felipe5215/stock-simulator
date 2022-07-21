import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import Exception from '../utils/http.exception';
import ZodException from '../utils/zod.exception';

const zodTest = (req: Request, res: Response, next: NextFunction) => {
  const mySchema = z.object({
    name: z.string(),
    age: z.number(),
  });

  try {
    mySchema.parse(req.body);
    res.send('Success');
  } catch (e) {
    if (e instanceof z.ZodError) {
      //  res.status(400).send(e.issues);
      throw new ZodException(400, e.issues);
    }
  }
};

export default zodTest;
