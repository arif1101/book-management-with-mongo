"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrows_controller_1 = require("./app/controllers/borrows.controller");
const app = (0, express_1.default)();
/* ──────────────────────────────────────────────────────────
   CORS SETUP
   Allow your production domain  +  localhost dev.
   Add more preview domains to the array if you use them.
   ────────────────────────────────────────────────────────── */
const allowedOrigins = [
    "https://book-management-indol-five.vercel.app", // production frontend
    "http://localhost:5173", // local Vite dev
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // same‑origin requests (no "Origin" header) are fine
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
}));
/* ────────────────────────────────────────────────────────── */
app.use(express_1.default.json());
/* API ROUTES */
app.use("/api", books_controller_1.booksRoutes);
app.use("/api", borrows_controller_1.borrowsRoutes);
/* ROOT ROUTE */
app.get("/", (_req, res) => {
    res.send("Welcome to Book Management system");
});
/* 404 HANDLER */
app.use((req, res) => {
    res.status(404).json({
        message: "Validation failed",
        success: false,
        error: {
            name: "NotFoundError",
            message: `Cannot ${req.method} ${req.originalUrl}`,
        },
    });
});
exports.default = app;
