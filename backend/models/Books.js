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

const Books = mongoose.model('Books', booksSchema);

export default Books;