import express from "express";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/user";
import { invalidRouteHandler } from "./util/invalidRouteHandler";
import { errorHandler } from "./util/errorHandler";
import authRouter from "./routes/authRoutes";
import spaceRouter from "./routes/spaceRoutes";
import testimonyRouter from "./routes/testimonyRoutes";
import cors from "cors";
import morgan from "morgan";

export const prisma = new PrismaClient();
const app = express();
app.use(morgan("dev"));

app.listen(8000, () => {
  console.log("Listening on port 8000");
});

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    credentials: true, // Allow cookies to be sent
  })
);
app.get("/api/swap-price", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.0x.org/swap/permit2/price?chainId=137&sellToken=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&buyToken=0xaAC208aBa017E39A51b9901d16beF8964776a569&sellAmount=1000000&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      {
        //@ts-ignore
        headers: {
          "0x-api-key": process.env.ZEROX_API_KEY,
          "0x-version": "v2",
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});
// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/space", spaceRouter);
app.use("/api/testimony", testimonyRouter);
app.use("*", invalidRouteHandler);
app.use(errorHandler);

// async function main() {
//   // ... you will write your Prisma Client queries here
//   try {
//     if (
//       await argon2.verify(
//         "$argon2id$v=19$m=65536,t=3,p=4$PWZIa8k7urM9kvvlQcpkNQ$ephEeJ60++tZUEH9OuX7RvFqI95r73w85dXnI17UzLQ",
//         "123456"
//       )
//     ) {
//       console.log("Password matches");
//     } else {
//       console.log("Password does not match");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// prisma.testimony;
// main();
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
