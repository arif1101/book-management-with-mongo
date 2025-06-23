import express, { Application, Request, Response } from 'express'
import { booksRoutes } from './app/controllers/books.controller'
import { borrowsRoutes } from './app/controllers/borrows.controller'
import { promises } from 'dns'

const app: Application = express()
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

// app.use((req: Request, res: Response) => {
//   res.status(404).json({
//     message: "Validation failed",
//     success: false,
//     error: {
//       name: `Not Found Path ${req.originalUrl}`
//     }
//   });
// });

// app.use((err: any, req: Request, res: Response, next: Function) => {
//   let status = 500;
//   let message = err.message || "Internal Server Error";
//   let error = err;

//   if (err.name === "ValidationError") {
//     status = 400;
//     message = "Validation failed";
//     // Only include 'name' and 'errors'
//     error = {
//       name: err.name,
//       errors: err.errors
//     };
//   }else if (err.name === "CastError") {
//     status = 400;
//     message = "Validation failed";
//     error = {
//       name: err.name,
//       ...err
//     };
//   } else if (err.name === "StockError") {
//     status = err.status || 400;
//     message = "Validation failed";
//     error = {
//       name: err.name,
//       errors: err.errors
//     };
//   }

//   res.status(status).json({
//     message,
//     success: false,
//     error
//   });
// });


export default app;