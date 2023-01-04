import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPost } from '../state';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PictureCard(props) {
    const navigate=useNavigate();
    const [likeCount,setLikeCount]=React.useState(Object.keys(props.element.likes).length);
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const currentUserId=useSelector((state)=> state.user._id);
    const token=useSelector((state)=>state.token)
    const [picUser,setPicUser]=React.useState({});
    const [isLiked,setIsLiked]=React.useState(Boolean(props.element.likes[currentUserId]));
    // console.log(isLiked);
    const findUser=async()=>{
        // console.log(props.element.userId);
        // UserId represents the person who has posted this pic
        // ki object id !!
        const response = await fetch(
            `http://localhost:3001/users/${props.element.userId}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        const data=await response.json();
        setPicUser(data);
    }
    // console.log(currentUserId);
    const handleLike=async()=>{
        const post=await fetch("http://localhost:3001/posts/"+props.element._id+"/like",{
            method: "PATCH",
            headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${token}` },
            body:JSON.stringify({userId:currentUserId})
        });
        const data=await post.json();
        // console.log(data);
        // console.log(isLiked);
        if(isLiked){
            setLikeCount((likeCount)=>(likeCount-1));
        }
        else{
            setLikeCount((likeCount)=>(likeCount+1));
        }
        setIsLiked(!isLiked);
    }
    useEffect(()=>{
        findUser();
    },[]);
    return (
        <Card sx={{ maxWidth: 800, margin: "auto", paddingBottom: "5rem" }}>
            <CardHeader
                onClick={()=>{
                    navigate("http://localhost:3000/profile/"+picUser._id);
                }}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <img width="100%" height="100%" src={`http://localhost:3001/assets/${picUser.picturePath}`} alt="R"></img>
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={`${picUser.firstName} ${picUser.lastName}`}
                subheader={picUser.location}
            />
            <CardMedia
                component="img"
                height="294"
                width="60%"
                image={props.element.picturePath}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.element.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton onClick={()=>{
                    handleLike();
                }} aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <Typography variant="h3" color="text.secondary">
                    {likeCount}
                </Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Comments 😊😍</Typography>
                    {props.element.comments.map((comment) => {
                        return (<Typography paragraph>
                            {comment}
                        </Typography>)
                    })}

                </CardContent>
            </Collapse>
        </Card>
    );
}