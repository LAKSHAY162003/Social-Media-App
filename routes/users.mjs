import express, { Router } from "express";

import{
    getUser,getUserFriends,addRemoveFriend,
}from "../controllers/users.mjs";

import { verifyToken } from "../middleware/auth.mjs";


const router=express.Router();
// /users is the base url for these routes mentioned below !!

// So using these routes : we will be : configuring various crud operations upon the
// data stored inside the : database !!!

// this id ki help se hi to : User ko dhundhenge !!
router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);
router.patch("/:id/:friendsId",verifyToken,addRemoveFriend);

export default router;