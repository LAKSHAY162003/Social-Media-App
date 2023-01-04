import dotenv from "dotenv";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.mjs";
import bodyParser from "body-parser";
dotenv.config();

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
        console.log(picturePath);
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

export const login=(req,res)=>{
    const {email,password}=req.body;
    // earlier in Secrets project we used : passport.js to do the authentication !!
    // console.log(email);
    // console.log(password);
    User.find({email:email},function(err,result){
        // console.log(result);
        if(err){
            res.status(500).send("Error in Finding in DataBase :"+err);
        }
        else{
            // Now we will use bcrypt to compare the hashed password with the 
            // one hashed password stored inside the database !!
            // saltRounds is stored inside database also !!
            // console.log(password);
            // console.log(result);
            // result is an array !! and that is why !! result[0] used !!
            bcrypt.compare(password, result[0].password, 
                function(err,result2) {
                if (err) { 
                    res.status(500).send(""+err);
                 }
                 else if(!result2){
                    res.status(500).send("Wrong Password Entered !!");
                 }
                else{
                    const token=jwt.sign({id:result._id},`${process.env.SECRET_KEY}`);
                    res.status(201).json({token,result});
                }
            });

            // Now we need to asign user the jwt !!
            // Jwt is doing : authorization and not authentication !!
            // Using passport.js how did we authorize the user ?? 
            // authorization of user : means simply : ki jis user ne : intialy login
            // kiya tha kya ye wahi hai even if we : close the tab and reopen it !!

            // idea is : TRADITIONAL WAY OF DOING IT WAS BY USING A SESSION COOKIE IN WHICH THE 
            // UNIQUE SESSION_ID FROM THE SESSION { WHICH WAS OFC CREATED AT SERVER }
            // is being fed when the response from server comes !!
            // then : Whenever client / browser send the request to the server 
            // then : along with that it send the : SESSION_ID ALSO !!
            // So idea is that : That session_id will be used to authorize the user !!

            // So how JWT works is That : 
            // as soon as we log in first time : it will create Json format me 
            // web token +a secret sting and then : send it to the user / client 
            // i.e server par kuch bhi store nahi hota !!

            // now another time we send a request then we send this jwt also
            // and thereby the server verifies the jwt signature and sends back 
            // the response if the user/client has the permission to see that response !!

            // NOW HOW THIS VERIFICATION OF JWT TAKES PLACE ?
            // SO : THE HEADER OF JWT + PAYLOAD { THAT CONTAINS ALL THE INFO }
            // IS HASHED USING BASE64 ALGORITHM WITH THE SECRET KEY YOU PASSED 
            // AND THEN : THAT IS COMAPRED WITH SIGNATURE { BASICALLY ORIGANLLY HASHED
            // VERSION OF THE DATA } AND IF THE RE CALCULATED SIGNATURE DOESNT MATCH
            // THE SIGNATURE SECTION OF THE JWT THEN MEANS USER CANT BE AUTHORIZED !!
            // IT IS NOT THE SAME USER THAT LOGGED IN !!

            // THE PLACE WHERE WE LOGGED IN WITH OUR USER ID AND PASSWORD WO THI AUTHENTICATION !!
            // basically : validating that hey yo he/she is a valid user of our system
            // by checking the credentials !! 
            
        }
    })

}

// WHAT WE WILL BE DOING ??
// WHEN A USER REGISTER : REGISTER IT AND WHEN IT LOGINS WITH
// CORRECT PWD AND ALL THEN :GIVE HIM JSON WEB TOKEN !!