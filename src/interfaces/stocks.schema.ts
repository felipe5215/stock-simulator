import { z } from 'zod';

const stocksSchema = z
  .object({
    clientId: z.string(),
    assetId: z.string(),
    assetQtty: z.number().positive().int(),
  })
  .strict();

export default stocksSchema;
