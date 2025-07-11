"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrows_controller_1 = require("./app/controllers/borrows.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: [
        "http://localhost:5173",
        "https://book-management-indol-five.vercel.app"
    ] }));
app.use(express_1.default.json());
app.use("/api", books_controller_1.booksRoutes);
app.use("/api", borrows_controller_1.borrowsRoutes);
app.get('/', (req, res) => {
    res.send("Welcome to Book Management system");
});
app.use((req, res) => {
    res.status(404).json({
        message: "Validation failed",
        success: false,
        error: {
            name: "NotFoundError",
            message: `Cannot ${req.method} ${req.originalUrl}`,
        }
    });
});
exports.default = app;
