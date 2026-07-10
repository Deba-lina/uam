import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import User from "./models/User.js";
import { errorHandler } from "./middleware/index.js";

dotenv.config();

const app = express();
const PORT = 3000;
const JWT_SECRET = "";

app.use(express.json());
app.use(cors());
app.use("/api", authRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT,()=>{
console.log( "Listening on port "+PORT)},);
