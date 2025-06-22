import { Model, model, Schema } from "mongoose";
import {IBorrow } from "../interfaces/borrow.interface";
import { Mode } from "fs";
import { BookMethods } from "../interfaces/book.interface";

const borrowSchema = new Schema<IBorrow>({
    book : {
        type : Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "book id must need"]
    },
    quantity: {
        type : Number,
        required : true,
        min : [1, "Quantity must be at least 1"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer"
        }
    },
    dueDate : {
        type: Date,
        required: [true, 'dueDate field not found']
    }

},{
    versionKey: false,
    timestamps: true
});



export const Borrow = model<IBorrow>("BorrowBook", borrowSchema)