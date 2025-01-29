import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../util/AppError";
import catchAsync from "../util/catchAsync";

const prisma = new PrismaClient();

// Create a new space
export const createSpace = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      title,
      message,
      questions,
      collectEmail,
      collectCompany,
      collectSocial,
      collectAddress,
      collectRating,
      theme,
      buttonColor,
    } = req.body;
    if (!title || !message || !questions || !buttonColor) {
      next(new AppError("Missing fields", 400));
      return;
    }
    const newSpace = await prisma.space.create({
      //@ts-ignore
      data: {
        title,
        message,
        questions,
        collectEmail,
        collectCompany,
        collectSocial,
        collectAddress,
        collectRating,
        theme,
        buttonColor,
        //@ts-ignore
        userId: req.id,
      },
    });

    res.status(201).json(newSpace);
  }
);

// Get all spaces
export const getSpaces = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const spaces = await prisma.space.findMany();
    res.status(200).json({ status: "success", data: spaces });
  }
);

// Get a single space by ID
export const getSpaceById = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const space = await prisma.space.findUnique({
      where: { id: Number(id) },
      include: { testimonies: true },
    });

    if (!space) {
      throw new AppError("Space not found", 404);
    }

    res.status(200).json(space);
  }
);

// Update a space by ID
export const updateSpace = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    // const { id } = req.params;

    const data = req.body;

    const updatedSpace = await prisma.space.update({
      //@ts-ignore
      where: { id: Number(req.id) },
      data,
    });

    res.status(200).json(updatedSpace);
  }
);

// Delete a space by ID
export const deleteSpace = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.space.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("Space not found", 404);
    }
    throw new AppError("Error deleting space", 500);
  }
};
