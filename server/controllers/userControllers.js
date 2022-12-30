const User = require('../models/userModel.js')
const ascyncHandler = require('express-async-handler')
const generateToken = require('../utill/generateToken')

const registerUser = ascyncHandler(async(req,res)=>{
    const { name, email ,password,pic } = req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400)
        throw new Error("User already exists")
    }
    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            pic:user.pic,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error ("Error occured")
    }
})

const authUser = ascyncHandler(async(req,res)=>{
    const { email ,password} = req.body;
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            pic:user.pic,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error ("Invalid Email or password")
    }
})
module.exports ={ registerUser,authUser}