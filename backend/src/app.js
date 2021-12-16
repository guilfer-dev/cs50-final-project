import express from "express";
import "dotenv/config";
import cors from "cors"

import AuthController from "./controllers/AuthController.js";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(router);

app.post("/auth", AuthController.auth)

const PORT = process.env.PORT || 3333;
const DB = process.env.DB_URL

app.listen(PORT, () => console.log(`🚀 Service is runing on PORT ${PORT}`));
mongoose.connect(DB).then(() => console.log("Connected to DB"))