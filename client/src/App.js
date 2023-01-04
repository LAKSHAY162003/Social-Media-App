import Home from './scenes/homePage/index.jsx';
import Login from './scenes/loginPage/index.jsx';
import Profile from './scenes/profilePage/index.jsx';
import Navbar from './scenes/navbar/index.jsx';
import Widget from './scenes/widgets/index.jsx';

import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {createTheme} from "@mui/material";
import {ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { themeSettings } from './theme.js';
import {Register} from "./scenes/loginPage/register.jsx"
import { useNavigate } from 'react-router-dom';

function App() {
  
  // So concept is that : this is a hook present in the 
  // react-redux and is used to : subscribe to a state property
  // that is jaise hi wo update hogi hame automatically pata chal jayega !!
  const mode=useSelector((state)=> state.mode);
  // useSelector() will be used to grab state jabhi hame chahiye ho !!

  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode])
  // usage of useMemo is same as : useEffect hook : [mode] property jab change hongi
  // tabhi ye createTheme wala function chalega !!
  // if not done : it will recompute those themeSettings even if the input havent been updated
  // and so do the output !!

  // So every time this component re renders : ye fnc chalta and performance ko slow down 
  // karta !!
  
  const isAuth=useSelector((state)=> state.token);
  // const navigate=useNavigate();
  return (
    <div className="app">
    
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/register" element={<Login/>}></Route>
          <Route path="/home" element={isAuth ? <Home/> :<Navigate to="/"/>}></Route>
          <Route path="/profile/:userId" element={isAuth ? <Profile/> : <Navigate to="/"/>}></Route>
        </Routes>
        </ThemeProvider>
        
    </div>
  );
}

export default App;
