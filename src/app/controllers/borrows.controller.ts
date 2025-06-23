import express from "express"
import type { Request, Response } from "express";
import { Borrow } from "../models/borrow.models"
import { Book } from "../models/books.models"
import { formatError } from "../../utils/errorFormatter";

export const borrowsRoutes = express.Router() 

// -------- borrow book ---------
borrowsRoutes.post("/borrow", async (req: Request, res: Response, next: Function): Promise<void> => {
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

    //Use the instance method (it checks + updates + saves)
    await book?.decrementStock(quantity);

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

  } catch (error: any) {
    const {status, body} = formatError(error);
    res.status(status).json(body)
    }
});


// ------ borrow book summery --------
borrowsRoutes.get("/borrow", async (req: Request, res: Response, next: Function) => {
  try{
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo"
        }
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn"
          },
          totalQuantity: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary
    });
  } catch(error: any){
    const {status, body} = formatError(error);
    res.status(status).json(body)
  }
});

