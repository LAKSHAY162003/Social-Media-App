import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Our own imports !!
import { useTheme } from '@emotion/react';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';
import { useDispatch ,useNavigate} from 'react-redux';
import { dark } from '@mui/material/styles/createPalette';
import { setLogin ,setMode} from '../state/index';
import Form from './form';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright ©'}
      <Link color="inherit" href="#">
        FaceGram ❤️
      </Link>{'   '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignInSide() {
  // const navigate=useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  

  return (
    <ThemeProvider theme={theme}>
    
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <IconButton onClick={() => {
                dispatch(setMode());
              }}>
                {theme.palette.mode === "dark" ? (
                  <BedtimeIcon sx={{ fontSize: "25px" }} />
                ) : (
                  <LightModeIcon sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
           
            <Form/>
          </Box>
        </Grid>
      </Grid>
      
    </ThemeProvider>
  );
}