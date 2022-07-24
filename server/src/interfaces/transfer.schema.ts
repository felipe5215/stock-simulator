import { z } from 'zod';

const transferSchema = z
  .object({
    clientId: z.string(),
    to: z.string(),
    amount: z.number().positive(),
  })
  .strict();

export default transferSchema;
