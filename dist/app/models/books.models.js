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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true
    },
    author: {
        type: String,
        required: [true, "need book author name"],
        trim: true
    },
    genre: {
        type: String,
        required: [true, "required genre from FICTION,NON_FICTION,SCIENCE,HISTORY,BIOGRAPHY,FANTASY"],
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    },
    isbn: {
        type: String,
        required: [true, "isbn number must be needed"],
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies must be a positive number"],
        validate: {
            validator: Number.isInteger,
            message: "Copies must be an integer value"
        }
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
// -------inteface moudle------
bookSchema.method('decrementStock', function (quantity) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield this.save();
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
