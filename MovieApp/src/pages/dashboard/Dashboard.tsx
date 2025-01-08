import React from 'react';
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Container, Grid, Paper, Typography } from '@mui/material';
import './Dashboard.scss'
import MyModalPost from '../../components/MyModalPost';
import { usePost } from '../../contexts/PostContext';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const Dashboard: React.FC = () => {

    const { posts, removePost }: any = usePost()
    const { currentUser }: any = useAuth()


    return (
        <Container sx={{ display: 'flex' }} className="dashboard-container">
            <Grid container item xs={12} justifyContent="center">
                <Paper elevation={3} className="dashboard-segment first-segment">
                    <MyModalPost />
                </Paper>
                {posts.map((post: any, index: number) => (
                    <Card
                        key={index}
                        sx={{
                            color: 'white',
                            backgroundColor: '#141414',
                            border: '1px solid gray',
                            mb: '10px',
                            width: '700px',
                        }}
                    >
                        <CardHeader
                            avatar={
                                <Link to={`../profile/${post.user.userId}`}>
                                    <Avatar src={post.user.profilePicture} sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    </Avatar>
                                </Link>
                            }
                            title={`${post.user.firstName + ' ' + post.user.lastName}`}
                            subheader={
                                <Typography sx={{ color: 'gray' }} variant='body2'>
                                    {post.post.timestamp}
                                </Typography>
                            }
                            action={
                                <CardMedia
                                    component="img"
                                    height="50"
                                    image={post.post.isLiked ? "https://icones.pro/wp-content/uploads/2021/04/icone-noire-vert.png" : "https://cdn-icons-png.flaticon.com/512/5953/5953169.png"}
                                />

                            }

                        />
                        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                            {currentUser.uid == post.user.userId ?
                                <Button onClick={() => removePost(post.post.postId)}>
                                    Delete Item
                                </Button>
                                :
                                null
                            }

                            <Typography sx={{ fontSize: '2rem' }}>
                                {post.movie.title}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            height="600"
                            sx={{ objectFit: 'contain', background: 'linear-gradient(to bottom, #141414, #202020, #141414)' }}
                            image={post.movie.poster}
                        />
                        <CardContent>
                            <Typography>
                                {post.post.content}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </Container >
    );
};

export default Dashboard;