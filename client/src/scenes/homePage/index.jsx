import { UserInfo } from "../../components/User";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";
import { useTheme } from "@emotion/react";
import WidgetWrapper from "../../components/widgetWrapper";
import { Container } from "@mui/system";
import { Box, useMediaQuery } from "@mui/material";

const Home=()=>{
    const theme=useTheme();
    const isMobileScreen=useMediaQuery("(min-width:1000px)");
    return(
        <>
        <Navbar/>
        <Box sx={{padding:"4rem 2rem"}} display={isMobileScreen ? "block" : "flex"}>
        <UserInfo/>
        </Box>
        </>
    )
}

export default Home;