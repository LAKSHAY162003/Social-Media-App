import { useTheme } from "@emotion/react";
import LocationOn from "@mui/icons-material/LocationOn";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFriends } from "../../state";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {useNavigate} from "react-router-dom";


export const FriendWidget = () => {
    const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
    const user=useSelector((state) => state.user);
  const getFriends = async () => {
    const userId=user._id;
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data); // Data successfull fetched !!
    dispatch(setFriends({ friends: data }));
  };

  const navigate=useNavigate();
  const FriendClick=(userElement)=>{
       navigate("/profile/"+userElement._id);
  }

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card sx={{ maxWidth: 305}} >
      
      <CardActionArea>
        <CardContent >
          <Typography variant="h3">Friends List</Typography>
          <hr></hr>
          <ul>
            {friends.map((element)=>{
              return (
                <IconButton onClick={()=>{
                  FriendClick(element);
                }}>
                <PeopleAltIcon/>
                <li style={{fontSize:"15px"}}>{element.firstName}</li>
                </IconButton>);
            })}
          </ul>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
