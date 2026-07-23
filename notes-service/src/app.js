import express from "express";
import noteRoutes from "./routes/note.routes.js";
import tagRoutes from "./routes/tag.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

// Tag endpoints
app.use("/tags", tagRoutes);

// Notes endpoints
app.use("/", noteRoutes);



app.use(errorHandler);

export default app;