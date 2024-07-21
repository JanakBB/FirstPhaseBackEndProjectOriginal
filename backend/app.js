import express from "express";
import cookieParser from "cookie-parser";

// router imports
import userRouter from "./routes/user.router.js";

// middleware imports
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorMiddleware.js";
import notFoundErrorHandlerMiddleware from "./middleware/notFoundErrorHandlerMiddleware.js";

//Initialized express app
const app = express();

// middlewares
app.use(express.json())
app.use(cookieParser());
app.use(express.static("public"));

// routes
app.use("/api/v1/users", logger, userRouter);

// errorHandler middleware
app.use(notFoundErrorHandlerMiddleware);
app.use(errorHandler);

export {app};