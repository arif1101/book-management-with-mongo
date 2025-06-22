import { model, Schema } from "mongoose";
import { BookMethods, IBook } from "../interfaces/book.interface";

export interface BookDocument extends IBook, Document, BookMethods {}

const bookSchema = new Schema<BookDocument>({
    title : {
        type : String,
        required : [true, "title is required"],
        trim : true
    },
    author : {
        type : String,
        required : [true, "need book author name"],
        trim : true
    },
    genre : {
        type : String,
        required : [true, "required genre from FICTION,NON_FICTION,SCIENCE,HISTORY,BIOGRAPHY,FANTASY"],
        enum : ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    },
    isbn : {
        type : String,
        required : [true, "isbn number must be needed"],
        unique : true,
        trim : true
    },
    description : {
        type : String
    },
    copies : {
        type : Number,
        required : true,
        min : [0, "Copies must be a positive number"],
        validate : {
            validator : Number.isInteger,
            message : "Copies must be an integer value"
        }

    },
    available : {
        type : Boolean,
        default : true
    }
},{
    versionKey : false,
    timestamps : true
});

bookSchema.method('decrementStock', async function (quantity: number){
    if (this.copies < quantity) {
    const customError = {
        name: "StockError",
        errors: {
        copies: {
            message: "Not enough copies available"
        }
        }
    };
    // Attach a status if you want
    (customError as any).status = 400;
    throw customError;
    }
    this.copies -= quantity;
    this.available = this.copies > 0;
    await this.save();
})

export const Book = model<BookDocument>("Book", bookSchema);
