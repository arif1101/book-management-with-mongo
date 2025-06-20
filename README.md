# Book Management with MongoDB

A simple Node.js application using TypeScript, Express, and Mongoose for managing books with MongoDB.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Project Setup

1. **Initialize npm and TypeScript:**
    ```sh
    npm init -y
    tsc --init
    ```

2. **Install dependencies:**
    ```sh
    npm install mongoose --save
    npm install express
    npm install --save-dev @types/express
    npm install --save-dev ts-node-dev
    ```

3. **Scripts**

    In your `package.json`, add the following script:
    ```json
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
    ```

4. **Development**

    Start the development server:
    ```sh
    npm run dev
    ```

## Project Structure

- `src/app.ts`: Express app configuration.
- `src/server.ts`: Entry point, connects to MongoDB and starts the server.

## Technologies Used

- [Express](https://expressjs.com/) - Web framework for Node.js
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at scale
- [ts-node-dev](https://github.com/wclr/ts-node-dev) - TypeScript execution and auto-restart for development

## License

This project is licensed under the ISC License.
