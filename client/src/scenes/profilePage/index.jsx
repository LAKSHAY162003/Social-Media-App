import { UserInfo } from "../../components/User";
import Navbar from "../navbar";
import { Outlet, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import WidgetWrapper from "../../components/widgetWrapper";
import { Container } from "@mui/system";
import { Box, useMediaQuery } from "@mui/material";
import { Friend } from "../../components/Friend";
// import { useEffect } from "react";

const Profile=()=>{
    const theme=useTheme();
    const isMobileScreen=useMediaQuery("(min-width:1000px)");
    const {userId}=useParams();
    
    return(
        <>
        <Navbar/>
        <Box sx={{padding:"4rem 2rem"}} display={isMobileScreen ? "block" : "flex"}>
        <Friend user={userId}/>
        </Box>
        </>
    )
}

export default Profile;