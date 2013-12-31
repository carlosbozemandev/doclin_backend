// handel uncaught exception error -- shut down the server
process.on("uncaughtException", (error) => {
  // custom print statement function
  printStatement(
    `Error: ${error.message}`,
    "Shutting down the server due to uncaught exception"
  );
  process.exit(1);
});


import app from "./app.js";
import dbConnect from "./src/utils/dbConnect.js";
import printStatement from "./src/utils/printStatement.js";


dbConnect()

const server = app.listen(process.env.PORT || 4000, () => {
  printStatement(`Server is Running on: ${process.env.SERVER_URL}`);
});


process.on("unhandledRejection", (error) => {
  printStatement(
    `Error: ${error.message}`,
    "Shutting down the server due to unhandled promise rejection"
  );
  server.close(() => {
    process.exit(1);
  });
});

