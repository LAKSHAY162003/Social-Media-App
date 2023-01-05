import { Card, CardActionArea, CardContent, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import PictureCard from "./card";

export const UserPosts = (props) => {
    const token=useSelector((state)=>state.token)
    const isMobileScreen=useMediaQuery("(min-width:1300px)");
    const [currUserPost, setCurrUserPosts] = useState([]);
    const fetchPosts = async () => {
        
        const postsResponse = await fetch(
            `http://localhost:3001/posts/${props.user._id}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        const posts = await postsResponse.json();
        console.log("Hey"+posts);
        setCurrUserPosts(posts);
    }
    useEffect(() => {
        fetchPosts();
    })
    return (
        <div>
            <Card sx={{ width: !isMobileScreen ? "600" : "900" }} >


                <Typography variant="h1" sx={{ textAlign: "center" }}>{props.user.firstName}'s Posts :{`)`}</Typography>
                {/* {currUserPost.length} */}
                {currUserPost.map((posti) => {
                    {/* console.log(posti); */ }
                    return (
                        <CardActionArea>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <CardContent sx={{ display: "block" }}>
                                    <IconButton >
                                        <PictureCard element={posti} />
                                    </IconButton>
                                </CardContent>
                            </div>
                        </CardActionArea>
                    );
                })}

            </Card>
        </div>
    )
}