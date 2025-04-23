import express from 'express';
import dotenv from "dotenv"
import { connectDB } from './config/db.js';

dotenv.config()
const app = express()

app.get("/books", (req, res) => {
    res.send("type poops");
})

app.listen(5000, ()=>{
    connectDB();
    console.log("Server started at port 5000");
})

