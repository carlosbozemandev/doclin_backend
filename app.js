import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import userRouter from "./src/routers/userRouter.js";
import timeSlotRouter from "./src/routers/timeSlotRouter.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors"


dotenv.config();
const app = express();

var corsOptions = {
    origin: process.env.REMOTE_CLIENT_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

app.use(`/api/v1`, userRouter);
app.use(`/api/v1`, timeSlotRouter);



app.use(errorMiddleware);
export default app;
