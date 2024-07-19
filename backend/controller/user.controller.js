import User from "../models/user.model.js";

const signup = async(req, res, next) => {
    try{
        let {name, email, password, isAdmin} = req.body;
        let userexists = await User.findOne({email});
        if(userexists){
            let err = new Error(`User with email ${email} already exists!`)
            err.status = 400;
            throw err;
        }
    
        let newUser = await User.create({
            name,
            email,
            password,
            isAdmin
        });
        res.send({
            message: "User registered successfully!",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin
            }
        })
    }
    catch(err){
        next(err);
    }
}

export {signup};