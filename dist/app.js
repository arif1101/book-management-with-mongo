"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrows_controller_1 = require("./app/controllers/borrows.controller");
const app = (0, express_1.default)();
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
// app.use((req: Request, res: Response) => {
//   res.status(404).json({
//     message: "Validation failed",
//     success: false,
//     error: {
//       name: `Not Found Path ${req.originalUrl}`
//     }
//   });
// });
// app.use((err: any, req: Request, res: Response, next: Function) => {
//   let status = 500;
//   let message = err.message || "Internal Server Error";
//   let error = err;
//   if (err.name === "ValidationError") {
//     status = 400;
//     message = "Validation failed";
//     // Only include 'name' and 'errors'
//     error = {
//       name: err.name,
//       errors: err.errors
//     };
//   }else if (err.name === "CastError") {
//     status = 400;
//     message = "Validation failed";
//     error = {
//       name: err.name,
//       ...err
//     };
//   } else if (err.name === "StockError") {
//     status = err.status || 400;
//     message = "Validation failed";
//     error = {
//       name: err.name,
//       errors: err.errors
//     };
//   }
//   res.status(status).json({
//     message,
//     success: false,
//     error
//   });
// });
exports.default = app;
