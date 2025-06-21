import express, { Application, Request, Response } from 'express'
import { booksRoutes } from './app/controllers/books.controller'
import { borrowsRoutes } from './app/controllers/borrows.controller'

const app: Application = express()
app.use(express.json())

app.use("/api", booksRoutes)
app.use("/api", borrowsRoutes)

app.get('/api', (req : Request, res : Response)=> {
    res.send("Welcome to Book Management system")
})


export default app;