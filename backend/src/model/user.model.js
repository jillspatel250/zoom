import mongoose,{ Schema } from "mongoose";

const userSchema=new Schema({
    name:{type:String,require:true},
    username:{type:String,require:true,unique:true},
    password:{type:String,require:true,min:8},
    token:{type:String},
})

const User=new mongoose.model("User",userSchema);

export default User;
