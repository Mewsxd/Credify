import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import catchAsync from "../util/catchAsync";
import { AppError } from "../util/AppError";
import { prisma } from "..";

export const getUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: {
      // @ts-ignore
      id: req.id,
    },
  });
  res.status(200).json({
    status: "success",
    data: user,
  });
};

export const deleteUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    await prisma.user.delete({
      where: {
        //@ts-ignore
        id: req.id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "User succesfully deleted",
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const name: string = req.body.name?.trim();
    if (!name) {
      next(new AppError("Empty field", 400));
      return;
    }
    if (name.length > 30) {
      next(new AppError("Name must be less than 30 characters", 400));
    }
    const updatedUser = await prisma.user.update({
      //@ts-ignore
      where: { id: req.id },
      data: { name: name, updatedAt: new Date() },
    });
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  }
);

export function signJwt(id: number): string {
  //@ts-ignore
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  // Check if the token exists
  if (!token) {
    res.status(401).json({
      status: "fail",
      message: "Authorization token is missing",
    });
    return;
  }

  const data = jwt.verify(token, process.env.JWT_SECRET as string);
  //@ts-ignore
  req.id = data.id;
  next();
};
