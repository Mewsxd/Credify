import { Request, Response, NextFunction } from "express";

type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const catchAsync = (fn: AsyncRouteHandler): AsyncRouteHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); // Pass error to centralized error handler
    }
  };
};

export default catchAsync;
