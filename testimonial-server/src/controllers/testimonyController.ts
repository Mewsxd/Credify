import { NextFunction, Request, Response } from "express";
import catchAsync from "../util/catchAsync";
import { prisma } from "..";
import { AppError } from "../util/AppError";

export const createTestimony = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      spaceId,
      review,
      name,
      email,
      social,
      rating,
      address,
      company,
      createdAt,
    } = req.body;

    const testimony = await prisma.testimony.create({
      data: {
        review,
        spaceId,
        name,
        email,
        social,
        rating,
        address,
        company,
        createdAt,
      },
    });
    res.status(200).json({
      status: "success",
      data: testimony,
    });
  }
);

export const getTestimony = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { spaceId } = req.params;
    if (!spaceId) {
      next(new AppError("Provide space id", 400));
      return;
    }
    const data = await prisma.testimony.findMany({
      where: {
        spaceId: Number(spaceId),
      },
    });
    res.status(200).json({
      status: "success",
      data,
    });
  }
);

export const deleteTestimony = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {}
);
