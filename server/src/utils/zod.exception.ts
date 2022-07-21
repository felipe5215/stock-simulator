import { ZodIssueBase } from 'zod';

class ZodException extends Error {
  status: number;
  messages: ZodIssueBase[];

  constructor(status: number, messages: ZodIssueBase[]) {
    super();
    this.status = status;
    this.messages = messages;
  }
}

export default ZodException;
