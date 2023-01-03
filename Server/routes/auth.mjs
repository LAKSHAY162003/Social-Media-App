// .mjs instruction kept so as that we can
// use these import statements !!

import express from "express";
import {login} from "../controllers/auth.mjs";

const router=express.Router();
// express.Router() is a middleware and routing system for Express applications.
// It creates an instance of a Router object that can be used to handle HTTP
// requests with specific paths.

// Routers can be used to create modular, mountable route handlers. 
// You can create multiple instances of a router and use them as middleware for your 
// application, or mount them at a specific path on the main app.

//app.use() karke jo karte hai use mounting of middle ware kehte hai !!
// means we have assigned / put this middleware corresponding to this path mentioned !!

// Using this router : you can keep all the related url requrest like 
// for eg the routes with base url : can be kept inside another folder 
// this will ofcourse increase modularity !! 

// Ok so there is some library called : supertest library to send http
// requests to these routes only without the need to run entire application !!

// LIKE IN THIS CASE : /auth is our base url !! for all the routes defined in this 
// folder !

router.post("/login",login);
// auth/login essentially !!
// callback fnc : login !!

export default router;