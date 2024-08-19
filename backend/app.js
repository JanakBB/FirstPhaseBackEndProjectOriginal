import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

// router imports
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import uploadRouter from "./routes/upload.router.js";

// middleware imports
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorMiddleware.js";
import notFoundErrorHandlerMiddleware from "./middleware/notFoundErrorHandlerMiddleware.js";

//Initialized express app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //nested field support: extended
app.use("/uploads", express.static(path.join(path.resolve(),"uploads")))
app.use(cookieParser());
app.use(express.static("public"));

// routes
app.use("/api/v1/users", logger, userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/image", uploadRouter);

// errorHandler middleware
app.use(notFoundErrorHandlerMiddleware);
app.use(errorHandler);

export { app };
