import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import userRouter from "./src/routers/userRouter.js";
import timeSlotRouter from "./src/routers/timeSlotRouter.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors"
import bookingRouter from "./src/routers/bookingRouter.js";


dotenv.config();
const app = express();
  
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

app.use(`/api/v1`, userRouter);
app.use(`/api/v1`, timeSlotRouter);
app.use(`/api/v1`, bookingRouter);



app.use(errorMiddleware);
export default app;
