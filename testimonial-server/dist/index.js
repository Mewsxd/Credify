"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("./routes/user"));
const invalidRouteHandler_1 = require("./util/invalidRouteHandler");
const errorHandler_1 = require("./util/errorHandler");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const spaceRoutes_1 = __importDefault(require("./routes/spaceRoutes"));
const testimonyRoutes_1 = __importDefault(require("./routes/testimonyRoutes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.listen(8000, () => {
    console.log("Listening on port 8000");
});
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    credentials: true, // Allow cookies to be sent
}));
app.get("/api/swap-price", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://api.0x.org/swap/permit2/price?chainId=137&sellToken=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&buyToken=0xaAC208aBa017E39A51b9901d16beF8964776a569&sellAmount=1000000&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", {
            //@ts-ignore
            headers: {
                "0x-api-key": process.env.ZEROX_API_KEY,
                "0x-version": "v2",
            },
        });
        const data = yield response.json();
        res.json(data);
    }
    catch (error) {
        res.status(500).send("Error fetching data");
    }
}));
// Middleware to parse JSON bodies
app.use(express_1.default.json());
app.use("/api/user", user_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/space", spaceRoutes_1.default);
app.use("/api/testimony", testimonyRoutes_1.default);
app.use("*", invalidRouteHandler_1.invalidRouteHandler);
app.use(errorHandler_1.errorHandler);
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
