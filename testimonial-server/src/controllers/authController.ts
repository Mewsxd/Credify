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
      include: { spaces: true },
    });

    if (user && (await argon2.verify(user.password, password))) {
      const { password, ...safeUser } = user;
      const jwt = signJwt(user.id);
      res
        .status(200)
        .cookie("jwt", jwt, {
          maxAge: 1000 * 60 * 60 * 24 * 90, // Cookie expiration in milliseconds (1 hour)
          httpOnly: false, // Ensures the cookie is sent only over HTTP(S), not accessible via JavaScript
          secure: true, // Ensures the cookie is sent over HTTPS (use false for local development)
          sameSite: "none", // Prevents CSRF attacks by controlling when the cookie is sent
        })
        .json({
          status: "success",
          jwt,
          data: { ...safeUser },
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
    console.log(email, password, name);

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
      include: { spaces: true },
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
    res
      .status(201)
      .cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 90, // Cookie expiration in milliseconds (1 hour)
        httpOnly: false, // Ensures the cookie is sent only over HTTP(S), not accessible via JavaScript
        secure: true, // Ensures the cookie is sent over HTTPS (use false for local development)
        sameSite: "none", // Prevents CSRF attacks by controlling when the cookie is sent
      })
      .json({
        status: "success",
        data: {
          ...user,
        },
        token,
      });
  }
);
