import httpStatus from "http-status";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";  
const login=async (req,res)=>{
    const {username,password}=req.body;
    try{
        if(!usernmae || !password){
            return res.status(httpStatus.ERROR).json({message:"enter valid credentials"});
        }
        try{
            const user=await User.findOne({username});
            if(!user){
                return res.status(httpStatus.NOT_FOUND).json({message:"user not found"});
            }
            if(bcrypt.compare(password,user.password)){
            let token=crypto.randomBytes(20).toString("hex");

            user.token=token;
            await user.save();
            return res.status(httpStatus.OK).json({token:token});
            }
        }catch(e){
            res.status(httpStatus.NOT_FOUND).json({message:"something went wrong"});
        }
    }
    catch(e){
        res.status(httpStatus.ERROR).json({message:""})
    }
}
const register=async (req,res)=>{
    const {name,username,password}=req.body;

    try{
        const existinguser=await User.findOne({username});
        if(existinguser){
            return res.status(httpStatus.FOUND).json({message:"user already registerd"});
        }
        const hasedpassword=await bcrypt.hasedpassword(password,10);

        const newuser=new User({
            name:name,
            username:username,
            password:hasedpassword,
        });

        await newuser.save();

        res.status(httpStatus.CREATED).json({message:"User registerd"});


    }catch(e){
        return res.status(httpStatus.NOT_FOUND).json
    }
}

export {login,register}