"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = formatError;
function formatError(error) {
    if (error.name === "CastError") {
        return {
            status: 400,
            body: {
                message: "Validation failed",
                success: false,
                error: {
                    name: error.name,
                    kind: error.kind,
                    path: error.path,
                    value: error.value
                }
            }
        };
    }
    if (error.name === "ValidationError") {
        return {
            status: 400,
            body: {
                message: "Validation failed",
                success: false,
                error: {
                    name: error.name,
                    errors: error.errors
                }
            }
        };
    }
    // Default
    return {
        status: 500,
        body: {
            message: "Internal Server Error",
            success: false,
            error
        }
    };
}
