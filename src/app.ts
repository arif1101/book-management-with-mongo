import express, { Application, Request, Response } from 'express'
import { booksRoutes } from './app/controllers/books.controller'
import { borrowsRoutes } from './app/controllers/borrows.controller'
import cors from "cors"

const app: Application = express()
app.use(cors({ origin: [
  "http://localhost:5173",
  "https://book-management-indol-five.vercel.app"
] }))
app.use(express.json())

app.use("/api", booksRoutes)
app.use("/api", borrowsRoutes)

app.get('/', (req : Request, res : Response)=> {
    res.send("Welcome to Book Management system")
})
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Validation failed",
    success: false,
    error: {
      name: "NotFoundError",
      message: `Cannot ${req.method} ${req.originalUrl}`,
    }
  });
});

export default app;