import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError } from "../util/AppError";
import catchAsync from "../util/catchAsync";
import multer from "multer";
import supabase from "../util/supabase";

const prisma = new PrismaClient();

// Create a new space
export const createSpace = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      title,
      message,
      spaceName,
      questions,
      collectEmail,
      collectCompany,
      collectSocial,
      collectAddress,
      collectRating,
      theme,
      // image,
      buttonColor,
    } = req.body;
    console.log(
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
      // publicUrl.data.publicUrl,
      //@ts-ignore
      req.id
    );
    if (!title || !message || !questions) {
      next(new AppError("Missing fields", 400));
      return;
    }
    // console.log("Title:", title);
    // console.log("File Info:", req.file);

    // Check if a file is uploaded
    if (!req.file) {
      return next(new AppError("No file uploaded", 400));
    }

    const file = req.file;
    const fileName = `images/${Date.now()}-${file.originalname}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("testimony-vids")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype, // Set correct content type
        upsert: false,
      });

    if (error) {
      console.error("Supabase Upload Error:", error);
      return next(new AppError("Failed to upload image", 500));
    }

    // Get public URL
    const publicUrl = supabase.storage
      .from("testimony-vids")
      .getPublicUrl(fileName);
    console.log("File uploaded successfully:", publicUrl);

    const newSpace = await prisma.space.create({
      //@ts-ignore
      data: {
        title,
        message,
        questions,
        spaceName,
        collectEmail,
        collectCompany,
        collectSocial,
        collectAddress,
        collectRating,
        theme,
        buttonColor,
        spaceImage: publicUrl.data.publicUrl,
        //@ts-ignore
        userId: req.id,
      },
    });

    res.status(201).json({
      status: "succes",
      data: newSpace,
    });
  }
);

//@ts-ignore
const bufferToFile = (buffer, filename, mimetype) => {
  return new File([buffer], filename, { type: mimetype });
};

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
