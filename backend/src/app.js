
// libraries
import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import "dotenv/config";

//  controllers
import AuthController from "./controllers/AuthController.js";
import RecommendationController from "./controllers/RecommendationController.js";
import CategoryController from "./controllers/CategoryController.js";
import UserController from "./controllers/UserController.js";

// middlewares
import validateToken from "./middlewares/validateToken.js";

// define 
const PORT = process.env.PORT || 3333;
const DB = process.env.DB_URL
const CORS = process.env.CORS


// declare instance of express
const app = express();

// add plugins
app.use(cors({
    origin: CORS
}));
app.use(express.json());

// declare used routes
app.post("/auth", AuthController.auth)
app.post("/recommendations", validateToken, RecommendationController.store)
app.post("/categories", CategoryController.store)
app.get("/categories", CategoryController.index)
app.get("/recommendations", RecommendationController.index)
app.patch("/recommendations/:id", validateToken, RecommendationController.update)
app.get("/activity", validateToken, UserController.show)

// setup the app
app.listen(PORT, () => console.log(`🚀 Service is runing on PORT ${PORT}`));
mongoose.connect(DB).then(() => console.log("🗄️  Connected to DB"))