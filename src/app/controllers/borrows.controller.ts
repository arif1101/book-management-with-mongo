import express from "express"
import type { Request, Response } from "express";
import { Borrow } from "../models/borrow.models"
import { Book } from "../models/books.models"

export const borrowsRoutes = express.Router() 


borrowsRoutes.post("/borrow", async (req: Request, res: Response): Promise<void> => {
    try {
      const { book: bookId, quantity, dueDate } = req.body;

      const book = await Book.findById(bookId);

      if (!book) {
        res.status(404).json({
          success: false,
          message: "Book not found",
        });
        return;
      }

      if (book.copies < quantity) {
        res.status(400).json({
          success: false,
          message: "Not enough copies available",
        });
        return;
      }

      book.copies -= quantity;

      if (book.copies === 0) {
        book.available = false;
      }

      await book.save();

      const borrow = await Borrow.create({
        book: book._id,
        quantity,
        dueDate,
      });

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
      });
    } catch (error) {
      console.error("Error borrowing book:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);
