import { model, Schema } from "mongoose";
import { BookMethods, IBook } from "../interfaces/book.interface";

export interface BookDocument extends IBook, Document, BookMethods {}

const bookSchema = new Schema<BookDocument>({
    title : {
        type : String,
        required : true,
        trim : true
    },
    author : {
        type : String,
        required : true,
        trim : true
    },
    genre : {
        type : String,
        required : true,
        enum : ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    },
    isbn : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    description : {
        type : String
    },
    copies : {
        type : Number,
        required : true,
        min : 0,
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
        throw new Error("Not enough copies available");
    }
    this.copies -= quantity;
    this.available = this.copies > 0;
    await this.save();
})

export const Book = model<BookDocument>("Book", bookSchema);
