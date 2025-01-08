
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import { useModal } from '../contexts/ModalContext';
import { PostDetails } from '../types/Post';
import { useAuth } from '../contexts/AuthContext';
import { useMovie } from '../contexts/MovieContext';
import React, { useState } from 'react';
import { usePost } from '../contexts/PostContext';
import { getCurrentTime } from '../utils/currentTime';

const MyModalPost = () => {
    const { open, handleOpen, handleClose }: any = useModal();

    const { movies } = useMovie();
    const { currentUser }: any = useAuth()
    const { addPost }: any = usePost()

    const timestamp = getCurrentTime()

    const [selectedMovieIndex, setSelectedMovieIndex] = useState<string>('')
    const [selectedLikeIndex, setSelectedLikeIndex] = useState<string>('')

    const selectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedMovieIndex(event.target.value as string)
        console.log(selectedMovieIndex)
    }

    const selectChangeLike = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedLikeIndex(event.target.value as string)
        console.log(selectedLikeIndex)

    }

    const [postData, setPostData] = useState<PostDetails>({
        content: '',
        timestamp: '',
        userId: currentUser.uid,
        movieId: '',
        comments: [],
        isLiked: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        })
    }
    const addNewPost = () => {
        const postDetails: PostDetails = {
            content: postData.content,
            timestamp: timestamp,
            userId: currentUser.uid,
            movieId: selectedMovieIndex,
            comments: [],
            isLiked: selectedLikeIndex == "Liked" ? true : false
        }
        addPost(postDetails)
    }

    return (
        <div style={{ textAlign: 'center', width: '100%' }}>
            <Button onClick={handleOpen} sx={{
                color: 'white',
                fontSize: '3rem',
                width: '100%'
            }}>
                +
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Paper elevation={3} style={{ padding: 16, maxWidth: 400, margin: 'auto', marginTop: 50 }}>
                    <Typography variant="h6" id="modal-title">
                        Add Post
                    </Typography>

                    <select onChange={selectChange} value={selectedMovieIndex}>
                        {movies.map((movie) => (
                            <option key={movie.movieId} value={movie.movieId}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                    <TextField
                        label="My Thoughts"
                        name="content"
                        value={postData.content}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Typography sx={{
                        wordSpacing: '1rem'
                    }}>
                        I
                        <select onChange={selectChangeLike} value={selectedLikeIndex}>
                            <option>
                                Liked
                            </option>
                            <option>
                                Disliked
                            </option>
                        </select>
                        This Movie.
                    </Typography>
                    <Button variant="contained" onClick={addNewPost} style={{ marginTop: 16 }}>
                        Add Post
                    </Button>
                    <Button variant="contained" onClick={handleClose} style={{ marginTop: 16, marginLeft: 8 }}>
                        Close
                    </Button>
                </Paper>
            </Modal>
        </div>
    );
};

export default MyModalPost;