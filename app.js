import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./src/middleware/errorMiddleware.js";


dotenv.config();
const app = express();



app.use(errorMiddleware);
export default app;
