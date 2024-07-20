import express from "express";

// router imports
import userRouter from "./routes/user.router.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorMiddleware.js";
import notFoundErrorHandlerMiddleware from "./middleware/notFoundErrorHandlerMiddleware.js";

//Initialized express app
const app = express();

// middlewares
app.use(express.json())
app.use(express.static("public"));

// routes
app.use("/api/v1/users", logger, userRouter);

// errorHandler
app.use(notFoundErrorHandlerMiddleware);
app.use(errorHandler);

export {app};