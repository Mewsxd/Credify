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
exports.signUp = exports.signIn = void 0;
const catchAsync_1 = __importDefault(require("../util/catchAsync"));
const AppError_1 = require("../util/AppError");
const __1 = require("..");
const argon2_1 = __importDefault(require("argon2"));
const userController_1 = require("./userController");
const validator_1 = __importDefault(require("validator"));
exports.signIn = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Trim email and password to remove extra spaces
    const email = (_a = req.body.email) === null || _a === void 0 ? void 0 : _a.trim();
    const password = (_b = req.body.password) === null || _b === void 0 ? void 0 : _b.trim();
    if (!email || !password) {
        next(new AppError_1.AppError("Email or password field cannot be empty", 400));
        return;
    }
    const user = yield __1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (user && (yield argon2_1.default.verify(user.password, password))) {
        const jwt = (0, userController_1.signJwt)(user.id);
        res.status(200).json({
            status: "success",
            jwt,
        });
    }
    else {
        next(new AppError_1.AppError("Invalid email or password", 404));
        return;
    }
}));
exports.signUp = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const email = (_a = req.body.email) === null || _a === void 0 ? void 0 : _a.trim();
    const password = (_b = req.body.password) === null || _b === void 0 ? void 0 : _b.trim();
    const name = (_c = req.body.name) === null || _c === void 0 ? void 0 : _c.trim();
    if (!validator_1.default.isEmail(email)) {
        next(new AppError_1.AppError("Please enter a valid email", 400));
        return;
    }
    // Validate request data
    if (!email || !password || !name) {
        next(new AppError_1.AppError("Incomplete data fields", 400));
        return;
    }
    if (name.length > 30) {
        next(new AppError_1.AppError("Name must be less than 30 characters", 400));
    }
    const userExists = yield __1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (userExists) {
        next(new AppError_1.AppError("User by this email id already exists", 400));
        return;
    }
    let hashedPassword = "";
    try {
        hashedPassword = yield argon2_1.default.hash(password);
    }
    catch (error) {
        console.log(error);
    }
    // Create user in the database
    const user = yield __1.prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
    const token = (0, userController_1.signJwt)(user.id);
    // Send success response
    res.status(201).json({
        status: "success",
        data: Object.assign({}, user),
        token,
    });
}));
