import { Request, Response, NextFunction } from "express";

/**
 * Middleware for handling invalid routes (404).
 */
export const invalidRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
};
