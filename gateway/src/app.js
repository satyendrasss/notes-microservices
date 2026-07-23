import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(helmet());

app.use(
  cors({
    origin: "*", // "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(compression());

app.use(cookieParser());

// app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});
// app.use(limiter);
app.use("/api", limiter);

console.log("Auth Service URL:", process.env.AUTH_SERVICE_URL);
console.log("Notes Service URL:", process.env.NOTES_SERVICE_URL);

app.get("/", (req, res) => {
  res.json({
    service: "API Gateway Service",
    status: "Running",
  });
});

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  "/api/notes",
  createProxyMiddleware({
    target: process.env.NOTES_SERVICE_URL,
    changeOrigin: true,
  })
);


export default app;