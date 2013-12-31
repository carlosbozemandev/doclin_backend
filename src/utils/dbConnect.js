import mongoose from "mongoose";
import printStatement from "./printStatement.js";

mongoose.set("strictQuery", false);

const DB_OPTIONS = {
  dbName: process.env.DB_NAME,
};

const dbConnect = async () => {
  await mongoose.connect(process.env.DB_CONNECTION, DB_OPTIONS).then(() => {
    printStatement("DB Connected")
  }).catch((error)=>{printStatement(error.message)});
};

export default dbConnect;