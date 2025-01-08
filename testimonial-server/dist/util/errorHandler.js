"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
/**
 * Middleware for handling errors.
 */
const errorHandler = (err, req, res, next) => {
    console.error("Caugh error: ", err.stack); // Log the error stack for debugging
    let errorMessage = err;
    delete errorMessage.stack;
    //@ts-ignore
    res.status(err.statusCode || 500).json({
        //@ts-ignore
        status: err.status || "error",
        message: errorMessage.message || "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
