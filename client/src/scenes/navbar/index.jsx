import FlexBetween from "../../components/FlexBetween";
import React from "react";
import { useState } from "react"
import {
    Box,
    IconButton,
    InputBase,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    Typography,
    Menu,
    AppBar,
    Toolbar,
    Button,
    Stack
} from "@mui/material"

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state/index";
import { Outlet, useNavigate } from "react-router-dom"
import { Container } from "@mui/system";

import EarbudsIcon from '@mui/icons-material/Earbuds';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MenuIcon from '@mui/icons-material/Menu';
const Navbar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    // basically side me present 3 dando ko aaap kholke menu banana chahte ho
    // ki nahi !!{in mobile view !!}
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const mode = useSelector((state) => state.mode);
    // to grab the state property from the redux store we use this !!
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    // this is a hook present in material ui to tell if the size of the 
    // screen is within the range specified in the arguments or not !!

    const theme = useTheme();// this is an object !!

    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    // Pls do mention the tool you used to generate all these pallets
    // and themes : as mentioned on the material ui site !!

    // const fullName=`${user.firstName}${user.lastName}`;


    const handleClick = () => {
        dispatch(setMode());
    }

    // sx={{}} aise custom styles doge !!
    return (
        <div>
        <Container maxWidth="sm">
            <Box>
                <AppBar sx={{ backgroundColor: `${background}`}}>
                    {/* This toolbar will be giving a padding from both ends !! */}
                    <Toolbar>
                        <IconButton>
                            <EarbudsIcon />
                        </IconButton>
                        <Typography sx={{flexGrow: "0.2"}} color="primary.main" fontWeight="bold" variant="h2">FaceGram ❤️</Typography>
                        {isNonMobileScreens && (
                            <FlexBetween
                                backgroundColor={neutralLight}
                                borderRadius="9px"
                                gap="3rem"
                                padding="0.1rem 1.5rem"
                            >
                                <InputBase placeholder="Search..." />
                                <IconButton>
                                    <PersonSearchIcon />
                                </IconButton>
                            </FlexBetween>
                        )}
                        <Typography sx={{ flexGrow: "1" }}></Typography>
                        {/* Desktop menu */}

                        {isNonMobileScreens ? <Stack direction="row" spacing={2}>

                            <IconButton onClick={() => {
                                dispatch(setMode())
                                console.log(mode);
                            }}>
                                {theme.palette.mode === "dark" ? (
                                    <BedtimeIcon sx={{ fontSize: "25px" }} />
                                ) : (
                                    <LightModeIcon sx={{ color: dark, fontSize: "25px" }} />
                                )}
                            </IconButton>

                            <IconButton><MarkunreadIcon /></IconButton>
                            <IconButton><NotificationsActiveIcon /></IconButton>
                            <IconButton ><ContactSupportIcon /></IconButton>
                            <FormControl variant="standard" value={user.firstName}>
                                <Select
                                    value={user.firstName}
                                    sx={{
                                        backgroundColor: neutralLight,
                                        width: "150px",
                                        borderRadius: "0.25rem",
                                        p: "0.25rem 1rem",
                                        "& .MuiSvgIcon-root": {
                                            pr: "0.25rem",
                                            width: "3rem",
                                        },
                                        "& .MuiSelect-select:focus": {
                                            backgroundColor: neutralLight,
                                        },
                                    }}
                                    input={<InputBase />}
                                >
                                    <MenuItem value={user.firstName}>
                                        <Typography>{user.firstName} </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        dispatch(setLogout())
                                        navigate("/");    
                                    }}>Log Out</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack> : <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <MenuIcon />
                        </IconButton>}

                        

                    </Toolbar>
                    {isMobileMenuToggled && !isNonMobileScreens && (
                            <Stack direction="column" spacing={2}>

                            <IconButton onClick={() => {
                                dispatch(setMode())
                                console.log(mode);
                            }}>
                                {theme.palette.mode === "dark" ? (
                                    <BedtimeIcon sx={{ fontSize: "25px" }} />
                                ) : (
                                    <LightModeIcon sx={{ color: dark, fontSize: "25px" }} />
                                )}
                            </IconButton>

                            <IconButton><MarkunreadIcon /></IconButton>
                            <IconButton><NotificationsActiveIcon /></IconButton>
                            <IconButton ><ContactSupportIcon /></IconButton>
                            <FormControl sx={{justifyContent:"center",alignItems:"center"}}variant="standard" value="Lakshay ">
                                <Select
                                    value="Lakshay "
                                    sx={{
                                        backgroundColor: neutralLight,
                                        width: "150px",
                                        borderRadius: "0.25rem",
                                        p: "0.25rem 1rem",
                                        "& .MuiSvgIcon-root": {
                                            pr: "0.25rem",
                                            width: "3rem",
                                        },
                                        "& .MuiSelect-select:focus": {
                                            backgroundColor: neutralLight,
                                        },
                                    }}
                                    input={<InputBase />}
                                >
                                    <MenuItem value="Lakshay ">
                                        <Typography>Lakshay </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        dispatch(setLogout())
                                        navigate("/");    
                                    }}>Log Out</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        )}
                </AppBar>
            </Box>
        </Container>
        <Outlet/>
        </div>
    )
}



export default Navbar;
// all the function based components should be having 1st letter as capital only !!

