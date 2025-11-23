import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
let port = process.env.PORT || 3000;

let app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/api/auth", authRouter);

app.listen(port, () => {
    connectDB()
    console.log(`Server Started port ${port}`);
    console.log("Path => ", "http://localhost:8000/");
});