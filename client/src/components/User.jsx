import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { Card, CardMedia, Container, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import InfoIcon from '@mui/icons-material/Info';
import WidgetWrapper from "./widgetWrapper";
import Widget from "../scenes/widgets";
import { FriendWidget } from "../scenes/widgets/FriendWidget";
import { Posts } from "../scenes/widgets/posts";
import MyPostWidget from "../scenes/widgets/addPostWidget";

export function UserInfo(){
    // fetch the data
    const user=useSelector((state)=> state.user);
    // from the redux store we got this !!
    const theme=useTheme();
    const isMobileScreen=useMediaQuery("(min-width:1300px)")
    return(
        <Box
        width="100%"
        padding="2rem 6%"
        display={isMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box sx={{padding:"2rem 3rem"}} flexBasis={isMobileScreen ?  undefined: "26%"}>
            <Widget isProfile={null} user={user}/>  
        </Box>
        
        <Box sx={{padding:"2rem 1rem"}} flexBasis={isMobileScreen ?  undefined: "26%"}>
            <MyPostWidget/>
            <br/><br/><br/>    
            <Posts/>  
        </Box>
        <Box sx={{padding:"2rem 3rem"}} flexBasis={isMobileScreen ?  undefined: "26%"}>
            <FriendWidget/>  
        </Box>
        </Box>
    )


}