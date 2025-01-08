import React from 'react';
import './Dashboard.scss'
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Container, Grid, Paper, Typography } from '@mui/material';
import { usePost } from '../contexts/PostContext';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import MyModalPost from '../components/MyModalPost';


const Dashboard: React.FC = () => {

    const { posts, removePost }: any = usePost()

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
                        />
                        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={() => removePost(post.post.postId)}>
                                Delete Item
                            </Button>
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
        </Container>
    );
};

export default Dashboard;