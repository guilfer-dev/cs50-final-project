import express from "express";
import "dotenv/config";
import cors from "cors"

import AuthController from "./controllers/AuthController.js";
import RecommendationController from "./controllers/RecommendationController.js";
import CategoryController from "./controllers/CategoryController.js";
import mongoose from "mongoose";

import validateToken from "./middlewares/validateToken.js";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(router);

app.post("/auth", AuthController.auth)
app.post("/recommendations", validateToken, RecommendationController.store)
app.post("/categories", CategoryController.store)
app.get("/categories", CategoryController.index)
app.get("/recommendations", RecommendationController.index)

const PORT = process.env.PORT || 3333;
const DB = process.env.DB_URL

app.listen(PORT, () => console.log(`🚀 Service is runing on PORT ${PORT}`));
mongoose.connect(DB).then(() => console.log("Connected to DB"))