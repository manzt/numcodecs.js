export class ValueError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValueError.prototype);
  }
}
