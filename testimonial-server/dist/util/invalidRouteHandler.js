"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidRouteHandler = void 0;
/**
 * Middleware for handling invalid routes (404).
 */
const invalidRouteHandler = (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "Route not found",
    });
};
exports.invalidRouteHandler = invalidRouteHandler;
