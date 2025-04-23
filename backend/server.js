import express from 'express';
import dotenv from "dotenv"
import { connectDB } from './config/db.js';
import Book from './models/Books.js';

dotenv.config()
const app = express();
app.use(express.json());

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(201).json({data: books});
    }catch(error){
        res.status(500).json({message: "Server error"});
    }
})

app.put("/books/:id", async (req, res) =>{
    const {id} = req.params;

    const book = req.body;

    try{
        const updatedBook = await Book.findByIdAndUpdate(id, book, {new: true})
        res.status(201).json({message: `Updated ${id}`});
    }catch(error){
        res.status(404).json({message: "Product not found"});
    }
});

app.post("/books", async (req, res) => {
    const book = req.body;

    if (!book.name || !book.author){
        return res.status(400).json({message: "Provide all fields"});
    }

    const newBook = new Book(book)

    try{
        await newBook.save();
        res.status(201).json({data: newBook});
    } catch(error){
        res.status(500).json({message: "Server error"})
    }
});

app.delete("/products/:id", async (req, res) => {
    const {id} = req.params

    try {
        await Book.findByIdAndDelete(id);
        res.status(201).json({message: `Deleted ${id}`});
    } catch(error) {
        res.status(404).json({message: "Product not found"});
    }
})

app.listen(5000, ()=>{
    connectDB();
    console.log("Server started at port 5000");
})

