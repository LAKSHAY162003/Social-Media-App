import { useTheme } from "@emotion/react";
import { Box, Card, CardActionArea, CardContent, Divider, InputBase, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setPosts } from "../../state";
import { useDispatch } from "react-redux";
import PictureCard from "../../components/card"
import { IconButton } from "@mui/material";
export function Posts() {
    const theme = useTheme();
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const isMobileScreen=useMediaQuery("(min-width:1300px)")
    const fetchPosts = async () => {
        const postsResponse = await fetch(
            `http://localhost:3001/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        const posts = await postsResponse.json();
        dispatch(setPosts({
            posts: posts
        }));
    }
    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <Card sx={{ width: !isMobileScreen?"600":"900" }} >


            <Typography variant="h1" sx={{textAlign:"center"}}>Check Your Feed :{`>`}</Typography>


            {/* {posts.length} */}
            {posts.map((element) => {
                return (

                    <CardActionArea>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <CardContent sx={{ display: "block" }}>
                                <IconButton >
                                    <PictureCard element={element}/>
                                </IconButton>
                            </CardContent>
                        </div>
                    </CardActionArea>
                );
            })}
        </Card>
    )
}