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
const argon2_1 = __importDefault(require("argon2"));
const invalidRouteHandler_1 = require("./util/invalidRouteHandler");
const errorHandler_1 = require("./util/errorHandler");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.listen(8000, () => {
    console.log("Listening on port 8000");
});
// Middleware to parse JSON bodies
app.use(express_1.default.json());
app.use("/api/user", user_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("*", invalidRouteHandler_1.invalidRouteHandler);
app.use(errorHandler_1.errorHandler);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // ... you will write your Prisma Client queries here
        try {
            if (yield argon2_1.default.verify("$argon2id$v=19$m=65536,t=3,p=4$PWZIa8k7urM9kvvlQcpkNQ$ephEeJ60++tZUEH9OuX7RvFqI95r73w85dXnI17UzLQ", "123456")) {
                console.log("Password matches");
            }
            else {
                console.log("Password does not match");
            }
        }
        catch (error) {
            console.log(error);
        }
    });
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
