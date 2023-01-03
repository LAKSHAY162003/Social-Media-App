import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    location:String,
    description:String,
    userPicturePath:String,
    picturePath:String,
    comments:{
        type:Array,
        default:[]
    },
    likes:{
        type:Map,
        of:Boolean
    }
    // So this is like a hashmap wala map !!
    // this will be having id vs boolean value 
    // making sure that : whenver we need to check if we have liked the post or not 
    // O(1) me we can see rather than traversing the whole list !!
    // as we did in case of Users !! when we need to add or remove Friend !!

    // Why we did it out here and not in Users is bcz : a user can have : not a whole 
    // lot of Friends they will be : limited in comparison to the 
    // likes that those people makes to the posts !!

    // So linearly traversing those arrays will be a hectic work !!

})


export const Posts=new mongoose.model("post",postSchema);
