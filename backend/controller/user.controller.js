import asyncHandler from "../middleware/asynchandler.middleware.js";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import createToken from "../utils/token.utils.js";
import isEmail from "../utils/validator.js";


// @desc register new user
// @route /api/v1/users/signup
// @access public
const signup = asyncHandler(async(req, res, next) => {
    let {name, email, password, isAdmin} = req.body;
    if(!isEmail(email)) throw new ApiError(400, "Invalid Email Pattern!");
    let userexists = await User.findOne({email});
    if(userexists){
        throw new ApiError(400, `User with email ${email} already exists!`)
    }

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

// @desc login user
// @route /api/v1/users/login
// @access public
const login = asyncHandler(async(req, res, next) => {
    let {email, password} = req.body;
    let user = await User.findOne({email});
    if(!user){
        throw new ApiError(400, `${email} is not registered!`)
    }

    if(await user.matchPassword(password)){
        createToken(res, user._id);
        res.send({message: "Login successfully!"})
    } else {
        throw new ApiError(404, "Password is not matched")
    }
})

// @desc logout the loggedin user
// @route /api/v1/users/logout
// @access private
const logout = asyncHandler((req, res) => {
    res.clearCookie("jwt");
    res.send({message: "Logout Success!"})
})

//****************************************************
// @desc get all users
// @route /api/v1/users/
// @access private/public
const getUsers = asyncHandler(async(req, res) => {
    let users = await User.find({}).select("-password");
    res.send(users);
})

// @desc fetch user profile
// @route /api/v1/users/profile
// @access private
const getUserProfile = asyncHandler(async(req, res) => {
    if(req.user) {
        res.send(req.user);
    }
});

// @desc update user profile
// @route /api/v1/users/profile
// @access private
const updateUserProfile = asyncHandler(async(req, res) => {
    if(req.user){
        let user = await User.findById(req.user._id);
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        let updatedUser = await user.save();
        res.send({message: "User profile updated", user: updatedUser});
    }
})

// @desc update user details
// @route /api/v1/users/update/:id
// @access private/admin
const updatedUser = asyncHandler(async(req, res) => {
    let id = req.params.id;
    let user = await User.findById(id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        let updatedUser = await user.save();
        res.send({message: "User upadated", user: updatedUser})
    } else{
        throw new ApiError(404, "User not found");
    }
})

// @desc delete user
// @route /api/v1/users/update/:id
// @access private/admin
const deleteUser = asyncHandler(async(req, res) => {
    let id = req.params.id;
    let user = await User.findById(id);
    if(user){
        if(user.isAdmin){
            throw new ApiError(400, "Cannot remove admin user")
        }
        await User.findByIdAndDelete(id);
        res.send({message: "User removed"});
    } else {
        throw new ApiError(404, "User not found");
    }
})

export {signup, login, logout, getUsers, getUserProfile, updateUserProfile, updatedUser, deleteUser};