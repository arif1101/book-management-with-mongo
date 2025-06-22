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
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_models_1 = require("../models/books.models");
exports.booksRoutes = express_1.default.Router();
// ------- create book and post to DB ------
exports.booksRoutes.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const book = yield books_models_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book
    });
}));
// ------- Get all book from DB --------
exports.booksRoutes.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = "createdAt", sort = "asc", limit = 10 } = req.query;
    const books = yield books_models_1.Book.find(filter ? { genre: filter } : {})
        .sort({ [sortBy]: sort === "desc" ? -1 : 1 })
        .limit(Number(limit));
    // const books = await Book.find({genre: "FICTION"}).sort({createdAt: 'desc'}).limit(2)
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
    });
}));
// -------- get single book by id --------
exports.booksRoutes.get('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield books_models_1.Book.findById(bookId);
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book
    });
}));
// ----------- update book -------------
exports.booksRoutes.patch("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = yield books_models_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book
    });
}));
// -------- delete book ----------
exports.booksRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield books_models_1.Book.findByIdAndDelete(bookId);
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    });
}));
