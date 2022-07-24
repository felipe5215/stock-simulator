import { z } from 'zod';

const orderSchema = z
  .object({
    clientId: z.string(),
    amount: z.number().positive(),
  })
  .strict();

export default orderSchema;
