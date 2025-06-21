import express, {Request, Response} from "express"
import { Book } from "../models/books.models";

export const booksRoutes = express.Router()

// ------- create book and post to DB ------
booksRoutes.post('/books', async (req: Request, res: Response) => {
    const body = req.body;
    const book = await Book.create(body);

    res.status(201).json({
        success : true,
        message : "Book created successfully",
        data: book
    })
})

// ------- Get all book from DB --------
booksRoutes.get('/books', async (req: Request, res: Response) => {

    const {filter, sortBy = "createdAt", sort = "asc", limit = 10} = req.query;
    const books = await Book.find(
        filter ? {genre: filter} : {}
    )
    .sort({[sortBy as string] : sort === "desc" ? -1 : 1})
    .limit(Number(limit));

    // const books = await Book.find({genre: "FICTION"}).sort({createdAt: 'desc'}).limit(2)

    res.status(200).json({
        success : true,
        message : "Books retrieved successfully",
        data: books
    })
})

// -------- get single book by id --------

booksRoutes.get('/books/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(200).json({
        success : true,
        message : "Book retrieved successfully",
        data: book
    })
})

// ----------- update book -------------

booksRoutes.patch("/books/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBody, {new : true})

    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data : book
    })
})



// -------- delete book ----------
booksRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId)

    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data : null
    })
})

