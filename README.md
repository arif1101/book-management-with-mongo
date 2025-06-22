# Book Management with MongoDB

A professional Node.js REST API application using TypeScript, Express, and Mongoose for managing books and borrow records with MongoDB.

## Features

- **Book Management:**  
  - Create, read, update, and delete books.
  - Enforce field validation (title, author, genre, ISBN, copies, etc.).
  - Unique ISBN and genre validation.
- **Borrow Management:**  
  - Borrow books with quantity and due date.
  - Stock management: prevents borrowing more copies than available.
- **Robust Error Handling:**  
  - Consistent JSON error responses for validation, not found, and stock errors.
- **Filtering & Sorting:**  
  - Filter books by genre and sort by fields.
- **API Ready:**  
  - Easily deployable and ready for integration with frontend or other services.

## Requirements

- Node.js (v16 or higher)
- npm
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/book-management-with-mongo.git
cd book-management-with-mongo
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory and add your MongoDB connection string:

```
MONGODB_URI=mongodb://localhost:27017/book-management
PORT=5000
```

> Replace the URI with your own if using MongoDB Atlas or a different setup.

### 4. Initialize TypeScript

```sh
tsc --init
```

### 5. Development Scripts

Add this to your `package.json` scripts section if not already present:

```json
"dev": "ts-node-dev --respawn --transpile-only src/server.ts"
```

### 6. Start the Development Server

```sh
npm run dev
```

The server will start on the port specified in your `.env` file (default: 5000).

## API Endpoints

### Book Endpoints

- `POST   /api/books`         — Create a new book
- `GET    /api/books`         — Get all books (with optional filtering/sorting)
- `GET    /api/books/:id`     — Get a single book by ID
- `PATCH  /api/books/:id`     — Update a book
- `DELETE /api/books/:id`     — Delete a book

### Borrow Endpoints

- `POST   /api/borrow`        — Borrow a book
- `GET    /api/borrow`        — Get all borrow records

## Example Book JSON

```json
{
  "title": "Learn with Express",
  "author": "JESS",
  "genre": "SCIENCE",
  "isbn": "20201001",
  "description": "A book about Express.js",
  "copies": 10,
  "available": true
}
```

## Example Borrow JSON

```json
{
  "book": "BOOK_OBJECT_ID_HERE",
  "quantity": 2,
  "dueDate": "2025-07-01T00:00:00.000Z"
}
```

## Technologies Used

- [Express](https://expressjs.com/) — Web framework for Node.js
- [Mongoose](https://mongoosejs.com/) — MongoDB object modeling tool
- [TypeScript](https://www.typescriptlang.org/) — Typed JavaScript at scale
- [ts-node-dev](https://github.com/wclr/ts-node-dev) — TypeScript execution and auto-restart for development

---
**For any questions or contributions, please open an issue or pull request on GitHub.**
