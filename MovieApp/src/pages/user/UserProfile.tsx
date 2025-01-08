import { Typography, Button, Container, CardContent, CardMedia, Card, CardHeader, Grid, Paper, Avatar } from '@mui/material';

import './UserProfile.scss'
import MyModal from '../../components/MyModal';
import { query, collection, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../config/config';
import { red } from '@mui/material/colors';
import { usePost } from '../../contexts/PostContext';


const UserProfile: React.FC = () => {

    const { userId }: any = useParams()

    const [userData, setUserData] = useState<any>([])
    const [postData, setPostData] = useState<any>([])

    const { removePost }: any = usePost()

    useEffect(() => {
        const getUser = async () => {

            const usersQuery = query(collection(db, 'users'), where('userId', '==', userId))
            const usersSnapshot = await getDocs(usersQuery)

            usersSnapshot.forEach((doc: any) => {
                setUserData(doc.data())
            })
        }
        getUser()
    }, [])

    useEffect(() => {
        const getPost = async (userId: string) => {
            const postQueryData = query(collection(db, 'posts'), where('userId', '==', userId))
            const postSnap = await getDocs(postQueryData)

            const data: any = []

            for (const postDoc of postSnap.docs) {
                const postData = postDoc.data()

                const movieId = postData.movieId

                const userDoc = await getDoc(doc(db, 'users', userId))
                const userData = userDoc.data()

                const movieDoc = await getDoc(doc(db, 'movies', movieId))
                const movieData = movieDoc.data()

                const combinedData = {
                    post: postData,
                    user: userData,
                    movie: movieData
                }
                data.push(combinedData)
            }
            setPostData(data)
        }
        getPost(userId)
    }, [])

    return (
        <>
            <Container sx={{
                color: 'white',
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <img
                                    src={userData.profilePicture}
                                    alt="Your Alt Text"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={3} style={{ padding: 16, color: 'white', backgroundColor: '#272b30' }}>
                                    <Typography variant="h6" gutterBottom>
                                        {userData.firstName} {userData.lastName}
                                    </Typography>
                                    <Typography>
                                        {userData.country}, {userData.city}
                                    </Typography>
                                </Paper>

                                <Paper elevation={3} style={{ padding: 16, marginTop: 16, color: 'white', backgroundColor: '#272b30' }}>
                                    <Typography variant="h6" gutterBottom>

                                    </Typography>
                                    <Typography>
                                        {userData.email}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8} container justifyContent="space-around">
                        <Grid item xs={12}>
                            <Paper elevation={3} style={{ padding: 16, minHeight: '80%', display: 'flex', flexDirection: 'column', backgroundColor: '#272b30', color: 'white' }}>
                                <Typography variant="h6" gutterBottom>
                                    User Bio
                                </Typography>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} style={{ padding: 16, minHeight: '90%', display: 'flex', flexDirection: 'column', backgroundColor: '#272b30', color: 'white' }}>
                                <Typography variant="h6" gutterBottom>
                                    Friends
                                </Typography>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Container sx={{ backgroundColor: '#272b30', mt: '20px', p: '20px', borderRadius: '10px' }}>
                    <Grid item sx={{ justifyContent: 'space-between', display: 'flex' }}>
                        <Button sx={{
                            backgroundColor: '#00A2B9',
                            fontSize: '1.5rem',
                            color: 'white',
                            m: '30px',
                            p: '20px'
                        }}>Liked Movies</Button>
                        <Button sx={{
                            backgroundColor: '#00A2B9',
                            fontSize: '1.5rem',
                            color: 'white',
                            m: '30px',
                            p: '20px'
                        }}>Disliked Movies</Button>
                    </Grid>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid container spacing={2}>
                            {postData.map((post: any, index: number) => (
                                <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                                    <Card sx={{ maxWidth: '100%', background: 'linear-gradient(to bottom, #141414, #202020, #141414)', color: 'white', border: '1px solid gray' }}>

                                        <CardHeader
                                            avatar={
                                                <Link to={`../profile/${post.user.userId}`}>
                                                    <Avatar src={userData.profilePicture} sx={{ bgcolor: red[500] }} aria-label="recipe">

                                                    </Avatar>
                                                </Link>
                                            }

                                            subheader={
                                                <Typography variant="body2">
                                                    {post.post.content}
                                                </Typography>
                                            }
                                        />

                                        <CardMedia
                                            component="img"
                                            height="auto"
                                            image={post.movie.poster}
                                            alt="Paella dish"
                                        />
                                        <CardContent>
                                            <Typography variant='body2'>
                                                {post.post.timestamp}
                                            </Typography>
                                            <Button onClick={() => removePost(post.post.postId)}>
                                                Delete Item
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Container >
                <MyModal />
            </Container>
        </>
    );
};

export default UserProfile;