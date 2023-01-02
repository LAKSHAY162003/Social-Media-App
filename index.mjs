
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import {register} from "./controllers/auth.mjs";
import authRoutes from "./routes/auth.mjs";
import {verifyToken} from "./middleware/auth.mjs"
import userRoutes from "./routes/users.mjs";
// config !!

// fileUrlToPath is a function that converts a file URL to a file path. 
// A file URL is a special type of URL that refers to a file on the computer's 
// file system. It looks something like this: "file:///path/to/file". A file path 
//is the path to a file on the file system, expressed as a string.
// For example, if you have a file URL that looks like this: 
// "file:///Users/username/Documents/myfile.txt", fileUrlToPath could convert 
// it to a file path string like this: "/Users/username/Documents/myfile.txt".

// It's worth noting that file URLs and file paths serve different purposes
//  and are not interchangeable. File URLs are used to locate files in the
//  context of a web browser or other application that 
// handles URLs, while file paths are used to locate files on the local file system.
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename); // USED TO CREATE THE BASE DIRECTORY NAME URL
// SIMPLY : THE BASE URL WILL NOT BE SAME WHEN WE HOST THIS WEBSITE !!
// THAT IS WHY WE KEEP THE BASE DIRECTORY STORED IN THIS WHICH WILL BE COMPUTED 
// INTIALLY BASED ON THE URL WE HAVE !!!
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"));
app.use(bodyParser.urlencoded({extended:true,limit:"30mb"}));
app.use(bodyParser.json({extended:true,limit:"30mb"}))
// Note : this app.use() is a middleware !!
// bodyParser.urlencoded() is a middleware function in the body-parser
// module for Node.js. It is used to parse incoming request 
// bodies that have been encoded in URL encoding (also known as percent-encoding).
// bodyParser.urlencoded() is typically used to parse form data that
//  has been submitted via an HTML form. 

app.use(cors());
// Please confirm its usage !!
app.use("/assets",express.static(path.join(__dirname,"public/assets")))
// this express.static() middleware is used to tell 
// that where all the static resources will be kept !! : like the img files ,css files etc !!
// public and then assets !! is where all such static files will be kept !!
// it is imp bcz otherwise they will not work !!

// Set up the File storage !!

// basically any photo if uploaded on 
// your file then it will be stored inside the public / assets folder !!
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
// Multer is a middleware for handling HTTP requests that contain enctype
// "multipart/form-data" , which is used for file uploads
// Multer provides several storage options for file uploads, including memory storage,
// disk storage, and cloud storage (using services such as AWS S3 or Google Cloud Storage).

// Disk storage is a simple storage engine that stores uploaded files on 
// the local file system of the server. It is the most straightforward of 
// the three options, but it may not be suitable for larger applications
//  because it can quickly fill up the server's disk space.

const upload=multer({storage});
// This upload variable will be used whenever we want to upload any file !!



// Data base Setup !!


mongoose.set("strictQuery", false);
const mongodb=process.env.URL;
const PORT=3001;
app.listen(PORT,()=>{
    console.log("The App has started at Port :"+PORT);
})

// backend at 3001 and frontend at 3000  
mongoose.connect(mongodb,(err)=>{
    if(err){
        console.log("Unsuccess !!"+err);
    }
    else{
        console.log("MongoDb is connected !!");
    }
})


// Authorization :
// Explanation : 
// 1. this is the url that will be hit via the frontend !!
// this url will be used : to Authenticate user !!
// Note : upload is the middleware used for the picture upload using multer 
// register is the 2nd middleware or we say the callback fnc over here 
// Jis order me hoga ushi order me callbacks fire honge !!

// ROUTES : 
app.post("/auth/register",upload.single("picture"),register);

// Route for authentication and all !!
app.use("/auth",authRoutes);
// Note : all the routes will be in the routes folder !!
// meaning : base url ke corresponding sare urls : router object ki help se 
// club / wire up kar lenge !!

app.use("/users",userRoutes);
