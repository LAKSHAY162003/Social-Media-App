import { useTheme } from "@emotion/react";
import { Box, Card, CardActionArea, CardContent, Divider, InputBase, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setPosts } from "../../state";
import { useDispatch } from "react-redux";
import PictureCard from "../../components/card"
import { IconButton } from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
export function Posts() {
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const posts1 = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const isMobileScreen = useMediaQuery("(min-width:1300px)")
    const fetchPosts = async () => {
        const postsResponse = await fetch(
            `http://localhost:3001/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        const posts = await postsResponse.json();
        
        console.log(posts);
        dispatch(setPosts({
            posts: posts
        }));

    }
    useEffect(() => {
        fetchPosts();
    }, []);

    // const handleFormSubmit=(e)=>{
    //     e.preventDefault();
    //     console.log("Done !!");
    // }

    return (
        <div>
            
            {/* Put dropzone over here ! */}
            <Card sx={{ width: !isMobileScreen ? "600" : "900" }} >


                <Typography variant="h1" sx={{ textAlign: "center" }}>Check Your Feed :{`>`}</Typography>

                {posts1.map((posti) => {
                    {/* console.log(posti); */}
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