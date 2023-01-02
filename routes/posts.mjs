import express from "express";
import {getUserPosts,likePost,getFeedPosts} from "../controllers/posts.mjs";
import { verifyToken } from "../middleware/auth.mjs";
const router=express.router();

// the fncs passed as callback to these : routing functions are what we call
// as controllers !! and the fncs : which simply : are passed before request to any
// given route is made : like those used to authenticate user , verifyTokens 
// are called middleware !!

// will show every post in our database !!
router.get("/",verifyToken,getUserPosts);

// will show the post made by a given user !!
router.get("/:userId/posts",verifyToken,getFeedPosts);

// will be called when we like/unlike { same as addRemove !! as we did before !!} a post !!
// this is post id !!
router.patch("/:id/like",verifyToken,likePost);

export default router;