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
        required : [true, "required genre from FICTION,NON_FICTION,SCIENCE,HISTORY,BIOGRAPHY,FANTASY,OTHER"],
        enum : ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY","OTHER"],
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

// -------inteface moudle------
bookSchema.method('decrementStock', async function (quantity: number){
    if (this.copies < quantity) {
        throw {
            name: "ValidationError",
            errors: {
                copies: {
                    message: "Not enough copies available",
                    name: "ValidatorError",
                    properties: {
                        message: "Not enough copies available",
                        type: "stock",
                    },
                    kind: "stock",
                    path: "copies",
                    value: quantity
                }
            }
        };
    }
    this.copies -= quantity;
    this.available = this.copies > 0;
    await this.save();
})

export const Book = model<BookDocument>("Book", bookSchema);
