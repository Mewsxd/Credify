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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.updateUser = exports.deleteUser = exports.getUser = void 0;
exports.signJwt = signJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../util/catchAsync"));
const AppError_1 = require("../util/AppError");
const __1 = require("..");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield __1.prisma.user.findUnique({
        where: {
            // @ts-ignore
            id: req.id,
        },
        include: { spaces: true },
    });
    if (user) {
        const { password } = user, safeUser = __rest(user, ["password"]); // Exclude password
        res.status(200).json({
            status: "success",
            data: safeUser,
        });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
exports.getUser = getUser;
exports.deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield __1.prisma.user.delete({
        where: {
            //@ts-ignore
            id: req.id,
        },
    });
    res.status(200).json({
        status: "success",
        message: "User succesfully deleted",
    });
}));
exports.updateUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const name = (_a = req.body.name) === null || _a === void 0 ? void 0 : _a.trim();
    if (!name) {
        next(new AppError_1.AppError("Empty field", 400));
        return;
    }
    if (name.length > 30) {
        next(new AppError_1.AppError("Name must be less than 30 characters", 400));
    }
    const updatedUser = yield __1.prisma.user.update({
        //@ts-ignore
        where: { id: req.id },
        data: { name: name, updatedAt: new Date() },
    });
    res.status(200).json({
        status: "success",
        data: updatedUser,
    });
}));
function signJwt(id) {
    //@ts-ignore
    const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
}
const protect = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log("JWT cookie:- ", req.cookies.jwt);
    // Check if the token exists
    if (!token) {
        res.status(401).json({
            status: "fail",
            message: "Authorization token is missing",
        });
        return;
    }
    const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    //@ts-ignore
    req.id = data.id;
    next();
};
exports.protect = protect;
