import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = (req, res, next) => {
    
    let token;
    
    if(req.method==="POST"){
        // console.log(req);
        token=req.rawHeaders[15];
    }
    else if(req.method!=="PATCH"){
        token = req.rawHeaders[9];
    }
    else{
        // console.log(req.rawHeaders);
        token=req.rawHeaders[13];
    }
    // So basically within header : we will be passing a Authorization also
    // using the axios : just like we did in other apis !!
    if (token) {
        if (token.startsWith("Bearer ")) {
            token=token.slice(7,token.length).trimLeft();
            // Basically idea is that : we will be passing the Headers
            // inside that we will be having an authorization property jiske andar 
            // Bearer token : aise denge ham !!
            jwt.verify(token, `${process.env.SECRET_KEY}`, (err, user) => {
                if (err) return res.status(403).send(err+"");
                // A 403 error is an error found on webpages which means that the webpage
                // you tried to go to is forbidden and that you are not supposed to access it.
                req.user = user; // BASICALLY THIS REQUEST OBJECT IS COMMON ACCROSS ALL THE 
                // REQUESTS SO NOW : KISI BHI ROUTE PE WE CAN USE THIS PARAMETER : 
                // TO PUT CONDITIONS ON THE PART OF CONTENT THAT WILL BE SEEN TO THE USER 
                // SAY : FOR EG FOR THE "/posts" route where all the posts of the user 
                // will be there then in that we can simply : based on this user property
                // only show user the posts that are related to him !!!

                // Note : Why this is imp !! Idea : it is imp bcz : otherwise : at each page 
                // user has to enter email and pwd so that we can get some info about the user
                // and show him his part of the posts or any other data !!

                // But now : har request ki start me : req object will be assigned a user 
                // and now har page pe jake user ko authenticate nahi karna padega apne aap ko !!

                // So basically : hamne jaise get route banaya hai getUser ke liye :
                // users/:id ka to basically : ham log database se us user ko find karenge
                //and we will check if the user jiski ham baat kar rahe hai and the 
                // one that is being authenticated is same or not !!

                next();
                // basically next() means next callback jo bhi hai
                // argument me !!! of the fnc in which it is passed
                // as an argument !!
            })
        }

    } else {
        return res.status(401).json("You are not authenticated");
    }
}