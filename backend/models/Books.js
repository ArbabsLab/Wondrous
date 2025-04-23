import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Book = mongoose.model('Book', booksSchema);

export default Book;