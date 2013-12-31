import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import userRouter from "./src/routers/userRouter.js";
import timeSlotRouter from "./src/routers/timeSlotRouter.js";


dotenv.config();
const app = express();

app.use(`/api/v1`, userRouter);
app.use(`/api/v1`, timeSlotRouter);



app.use(errorMiddleware);
export default app;
