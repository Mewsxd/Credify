import { NextFunction, Request, Response } from "express";
import catchAsync from "../util/catchAsync";
import { AppError } from "../util/AppError";
import { prisma } from "..";
import argon2 from "argon2";
import { signJwt } from "./userController";
import validator from "validator";

export const signIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Trim email and password to remove extra spaces
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    if (!email || !password) {
      next(new AppError("Email or password field cannot be empty", 400));
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && (await argon2.verify(user.password, password))) {
      const jwt = signJwt(user.id);
      res.status(200).json({
        status: "success",
        jwt,
      });
    } else {
      next(new AppError("Invalid email or password", 404));
      return;
    }
  }
);

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();
    const name = req.body.name?.trim();

    if (!validator.isEmail(email)) {
      next(new AppError("Please enter a valid email", 400));
      return;
    }

    // Validate request data
    if (!email || !password || !name) {
      next(new AppError("Incomplete data fields", 400));
      return;
    }

    if (name.length > 30) {
      next(new AppError("Name must be less than 30 characters", 400));
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      next(new AppError("User by this email id already exists", 400));
      return;
    }
    let hashedPassword = "";
    try {
      hashedPassword = await argon2.hash(password);
    } catch (error) {
      console.log(error);
    }

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    const token: string = signJwt(user.id);

    // Send success response
    res.status(201).json({
      status: "success",
      data: {
        ...user,
      },
      token,
    });
  }
);
