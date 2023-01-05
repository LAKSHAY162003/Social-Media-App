import { useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Widget from "../scenes/widgets/index"
import { UserPosts } from "./UserPosts"
export const Friend=(props)=>{
    const token=useSelector((state)=>state.token);
    const [user,setUser]=useState(null);
    const fetchUser=async()=>{
        // console.log(props);
        const postsResponse = await fetch(
            `http://localhost:3001/users/${props.user}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        const posts = await postsResponse.json();
        setUser(posts);
        // console.log(user);
    }
    
    useEffect(()=>{
        fetchUser();
    },[])
    
   
    const isMobileScreen=useMediaQuery("(min-width:1300px)")
    return(
        <Box
        width="100%"
        padding="2rem 6%"
        display={isMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
      {/* Super imp use case : apka : Jabtak prop ready na ho tabtak
      // na bhejna ho to uspe useState() lagado !! and do conditional
      // rendering !! */}
        <Box sx={{padding:"2rem 3rem"}} flexBasis={isMobileScreen ?  undefined: "26%"}>
            {user && <Widget isProfile={`false`} user={user}/>}
        </Box>
        
        <Box sx={{padding:"2rem 1rem"}} flexBasis={isMobileScreen ?  undefined: "26%"}>
                {user && <UserPosts user={user}/>}
        </Box>
        <Box sx={{padding:"2rem 3rem"}} flexBasis={isMobileScreen ?  undefined: "26%"}>
             
        </Box>
        </Box>
    )
}