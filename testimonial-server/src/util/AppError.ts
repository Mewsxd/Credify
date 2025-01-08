export class AppError extends Error {
  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    //@ts-ignore
    this.statusCode = statusCode || 500;
    //@ts-ignore
    this.status = statusCode < 500 ? "fail" : "error";
  }
}
