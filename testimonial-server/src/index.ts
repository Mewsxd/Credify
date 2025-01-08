import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/user";
import argon2 from "argon2";
import { invalidRouteHandler } from "./util/invalidRouteHandler";
import { errorHandler } from "./util/errorHandler";
import authRouter from "./routes/authRoutes";

export const prisma = new PrismaClient();
const app = express();

app.listen(8000, () => {
  console.log("Listening on port 8000");
});

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use("*", invalidRouteHandler);
app.use(errorHandler);

async function main() {
  // ... you will write your Prisma Client queries here
  try {
    if (
      await argon2.verify(
        "$argon2id$v=19$m=65536,t=3,p=4$PWZIa8k7urM9kvvlQcpkNQ$ephEeJ60++tZUEH9OuX7RvFqI95r73w85dXnI17UzLQ",
        "123456"
      )
    ) {
      console.log("Password matches");
    } else {
      console.log("Password does not match");
    }
  } catch (error) {
    console.log(error);
  }
}

// main();
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
