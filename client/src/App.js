import Home from './scenes/homePage/index.jsx';
import Login from './scenes/loginPage/index.jsx';
import Profile from './scenes/profilePage/index.jsx';
import Navbar from './scenes/navbar/index.jsx';
import Widget from './scenes/widgets/index.jsx';

import {BrowserRouter,Navigate,Routes,Route} from "react-router-dom";
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {createTheme} from "@mui/material";
import {ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { themeSettings } from './theme.js';



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
  
  return (
    <div className="app">
      <BrowserRouter>
      
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/profile/:userId" element={<Profile/>}></Route>
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
