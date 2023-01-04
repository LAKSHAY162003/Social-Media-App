import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useTheme } from '@emotion/react';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Widget() {
    const theme=useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const user=useSelector((state)=>state.user);
  return (
    <Card sx={{ maxWidth: 305}} >
      
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:3001/assets/${user.picturePath}`}
          alt="Nahi hai"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {user.firstName} {user.lastName}
            <IconButton><PersonAddIcon/></IconButton>
          </Typography>
          <hr/>
          <IconButton>
            <LocationOnIcon/>
            <Typography>{user.location}</Typography>
          </IconButton>
          <IconButton>
            <BusinessCenterIcon/>
            <Typography>{user.occupation}</Typography>
          </IconButton>
            <hr/>
            <IconButton><Typography >Profile Views &emsp;{user.viewedProfile}</Typography></IconButton>
            <IconButton><Typography >Impression &emsp;{user.impressions}</Typography></IconButton>
            <hr></hr>
            <IconButton>
            <LinkedInIcon/>
            <Typography>LinkedIn&emsp;</Typography>
            <FacebookIcon/>
            <Typography>Facebook</Typography>
          </IconButton>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions> */}
    </Card>
  );
}