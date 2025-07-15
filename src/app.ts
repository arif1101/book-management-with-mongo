import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

import { booksRoutes }   from "./app/controllers/books.controller";
import { borrowsRoutes } from "./app/controllers/borrows.controller";

const app: Application = express();

const allowedOrigins = [
  "https://book-management-indol-five.vercel.app", // production frontend
  "http://localhost:5173",                         // local Vite dev
];

app.use(
  cors({
    origin: (origin, callback) => {
      // same‑origin requests (no "Origin" header) are fine
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);


app.use(express.json());

/* API ROUTES */
app.use("/api", booksRoutes);
app.use("/api", borrowsRoutes);

/* ROOT ROUTE */
app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to Book Management system");
});

/* 404 HANDLER */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Validation failed",
    success: false,
    error: {
      name: "NotFoundError",
      message: `Cannot ${req.method} ${req.originalUrl}`,
    },
  });
});

export default app;
