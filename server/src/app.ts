import type { Application, Request, Response } from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
import config from "./config/index.js";
import router from "./routes/index.js";

const app: Application = express();

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:3001",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    environment: config.node_env,
    message: "File management system running..",
    timeStamp: new Date().toISOString(),
    uptime: process.uptime().toFixed(2) + " sec",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
