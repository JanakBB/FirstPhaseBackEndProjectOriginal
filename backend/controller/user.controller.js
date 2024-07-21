import asyncHandler from "../middleware/asynchandler.middleware.js";
import User from "../models/user.model.js";
import createToken from "../utils/token.utils.js";
// import bcrypt from "bcryptjs";

const signup = asyncHandler(async(req, res, next) => {
    let {name, email, password, isAdmin} = req.body;
    let userexists = await User.findOne({email});
    if(userexists){
        let err = new Error(`User with email ${email} already exists!`)
        err.status = 400;
        next(err);
    }

    // let salt = await bcrypt.genSalt(10);
    // let hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await User.create({
        name,
        email,
        password,
        isAdmin
    });

    createToken(res, newUser._id);

    res.send({
        message: "User registered successfully!",
        user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        }
    })
})

const login = asyncHandler(async(req, res, next) => {
    let {email, password} = req.body;
    let user = await User.findOne({email});
    if(!user){
        let err = new Error(`${email} is not registered!`);
        err.status = 400;
        next(err);
    }

    if(await user.matchPassword(password)){
        createToken(res, user._id);
        res.send({message: "Login successfully!"})
    } else {
        let err = new Error("Password is not matched");
        err.status = 404;
        next(err);
    }
})

const logout = asyncHandler((req, res) => {
    res.clearCookie("jwt");
    res.send({message: "Logout Success!"})
})

//****************************************************
const getUsers = asyncHandler(async(req, res) => {
    let users = await User.find({}).select("-password");
    res.send(users);
})
export {signup, login, logout, getUsers};