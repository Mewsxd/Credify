import { Request, Response, NextFunction } from "express";

/**
 * Middleware for handling errors.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Caugh error: ", err.stack); // Log the error stack for debugging
  let errorMessage = err;
  delete errorMessage.stack;
  //@ts-ignore
  res.status(err.statusCode || 500).json({
    //@ts-ignore
    status: err.status || "error",
    message: errorMessage.message || "Internal Server Error",
  });
};
