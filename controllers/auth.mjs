import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.mjs";
import bodyParser from "body-parser";
// This Users will be basically be used to store the schema and model 
// of the Users table and for Registering the user 
// ofcourse ishi model ko use karke databse me entry karenge !! 

// bcrypt : this module already covered : used to hash the passwords !!!

// Jwt : basically this is used to send to the user a web token that 
// they can use for authorization !! THEY ARE LIKE THOSE ACCESS TOKENS THAT WE RECIEVE 
// IN CASE OF OAUTH !!!

// Authorization is the process of determining whether a user or 
//client has permission to perform a certain action or access a 
// certain resource. It is often used to control
//  access to resources that are protected, such as certain routes in 
//an application or certain data in a database.


// REGISTER USER !!

export const register =(req, res) => {
        const { firstName, lastName, email, password, picturePath, location, occupation, friends } = req.body; // Destructuring !! 
        const saltRounds = 10
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err){
                // The HyperText Transfer Protocol (HTTP) 500 Internal Server Error 
                //server error response code indicates that the server encountered 
                // an unexpected condition that prevented it from fulfilling the request
                res.status(500).send("Unsuccess at Bcrypt !!"+err);
                // The res. status() function set the HTTP status for the response.
                // Means frontend will get a status code of 500 and this error message !!
            }
            else{
                const passwordNew=hash;
                const obj = new User({
                    firstName,
                    lastName,
                    email,
                    password: passwordNew,
                    picturePath,
                    location,
                    occupation,
                    friends,
                    viewedProfile: Math.floor(Math.random() * 100000),
                    impressions: Math.floor(Math.random() * 100000)
                });
                obj.save(function(err2,data){
                    if(err2){
                        res.status(500).send("Unsuccess at adding to database!!"+err2);
                    }
                    else{
                        res.status(201).json(data);
                    }
                });
            }
        });
        
        
        // We will send the : data saved if status == true !!
    }

// WHAT WE WILL BE DOING ??
// WHEN A USER REGISTER : REGISTER IT AND WHEN IT LOGINS WITH
// CORRECT PWD AND ALL THEN :GIVE HIM JSON WEB TOKEN !!