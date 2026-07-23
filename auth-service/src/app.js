import dotenv from "dotenv";
import express from "express";
// import { connectDB, disconnectDB } from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import ApiError from "./utils/ApiError.js";
import errorMiddleware from "./middleware/error.middleware.js";
// import redisClient from "./config/redis.js";

dotenv.config();
// connectDB();

const app = express();

app.use(express.json());

console.log("Database URL:", process.env.DATABASE_URL);

// Register auth routes
app.use("/", authRoutes);

// await redisClient.set("project", "Notes Microservice");
// const value = await redisClient.get("project");
// console.log(value);

// 404 handler
app.use((req, res, next) => {
    next(ApiError.notFound(`Cannot ${req.method} ${req.originalUrl}`));
});
// Always last
app.use(errorMiddleware);

export default app;