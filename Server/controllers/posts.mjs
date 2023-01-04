
import {Posts} from "../models/Posts.mjs";
import User from "../models/Users.mjs"

export const getUserPosts=async(req,res)=>{
    try{
        const {userId}=req.params;
        const allPosts=await Posts.find({userId:userId});
        res.status(200).json(allPosts);
        // again : getRequest that is why 200 status code and not 201
    }
    catch{
        res.status(500).json({errMessage:err});
    }
}

export const likePost=async(req,res)=>{
    try{
    // it will be inresponse to a patch request !!
    // isme url will be : /posts/id
    // this id will be the post id !!
    const {id}=req.params; // getting the routing parameters !!
    const {userId}=req.body; // How we will send it and all : wo sara 
    // jab frontend ayega tab dekhenge !!
        const givenPost=await Posts.findById(id);
    // now : we need to : check if this post is liked or not by this guy !!
        
        const likes=givenPost.likes;
        if(likes.has(userId)){
            likes.delete(userId);
            await givenPost.save();
            res.status(201).send(givenPost);
        }
        else{
            likes.set(userId,"true");
            await givenPost.save();
            // map will be userId vs boolean { boolean side always true !!}
            // bcz : false walo ko to ham delete hi maar derahe hai !!
            res.status(201).send(givenPost);
        }

    }
    catch(err){
        res.status(500).json({errMessage:`${err}`});
    }
} 

export const getFeedPosts=async(req,res)=>{
    try{
        const posts=await Posts.find(); // will get all the posts !!
        res.status(200).json(posts);

        // 200 status code is for: get request : where we say that he yo your 
        // request to the server was successfull and we were able to use generate some response
        // while 201 means : request was succes and some : Resource has been created or deleted !!
    }
    catch(err){
        res.status(500).send({errMessage:err});
    }
}

export const createPost=async(req,res)=>{
   try{
        const {userId,description,picturePath}=req.body;
        // these are the fields in the form for upload !!

        const user=await User.findById(userId);
        console.log(user);
        const obj=new Posts({
            userId,
            description,
            picturePath,
            location:user.location,
            lastName:user.lastName,
            firstName:user.firstName,
            userPicturePath:user.picturePath,
            likes:{},
            comments:[]
        });
        await obj.save();
        res.status(201).json(obj);
    }
    catch(err){
        res.status(500).json({errMessage:err});
    }
}

