"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        //@ts-ignore
        this.statusCode = statusCode || 500;
        //@ts-ignore
        this.status = statusCode < 500 ? "fail" : "error";
    }
}
exports.AppError = AppError;
