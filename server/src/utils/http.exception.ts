class Exception extends Error {
  status: number;
  messages: string;

  constructor(status: number, messages: string) {
    super(messages);
    this.status = status;
    this.messages = messages;
  }
}

export default Exception;
