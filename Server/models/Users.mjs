import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
    },
    viewedProfile:{
        type:Number
    },
    impressions:{
        type:Number
    },
    picturePath:{
        type:String
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String
})

const User=mongoose.model("user",UserSchema);
export default User;