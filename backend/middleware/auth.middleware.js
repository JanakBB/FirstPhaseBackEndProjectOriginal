import asyncHandler from "./asynchandler.middleware.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
import ApiError from "../utils/apiError.js";

const checkAuth = asyncHandler(async(req, res, next) => {
    let token = req.cookies.jwt;
    if(!token) {
        throw new ApiError(401, "You must be logged in!")
    }
    try{
        let {userId} = jwt.verify(token, process.env.JWT_SECRET);
        let userdetails = await User.findById(userId).select("-password");
        req.user = userdetails;
        next()
    }
    catch(e){
        throw new ApiError(401, "Invalid Token")
    }
});

const checkAdmin = asyncHandler(async(req, res, next) => {
    let {isAdmin} = req.user;
    if(isAdmin) next();
    else {
        throw new ApiError(403, "You are not authorized to perform this operation!")
    }
})

export {checkAuth, checkAdmin};