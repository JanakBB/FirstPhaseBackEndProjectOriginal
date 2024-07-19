import express from "express";

// router imports
import userRouter from "./routes/user.router.js";

//Initialized express app
const app = express();

// middlewares
app.use(express.json())

// routes
app.use("/api/v1/users", userRouter)

export {app};