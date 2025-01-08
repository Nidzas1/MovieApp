
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import { useModal } from '../contexts/ModalContext';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Movie } from '../types/Movie';
import { useMovie } from '../contexts/MovieContext';

const MyModal = () => {
    const { open, handleOpen, handleClose }: any = useModal();

    const { currentUser }: any = useAuth()
    const { addMovie }: any = useMovie()

    const [movieData, setMovieData] = useState<Movie>({
        title: '',
        genre: '',
        releaseYear: 0,
        likedBy: [currentUser.uid],
        dislikedBy: [],
        movieId: '',
        poster: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieData({
            ...movieData,
            [e.target.name]: e.target.value
        })
    }

    const addNewMovie = () => {
        const postMovieDetails: any = {
            title: movieData.title,
            genre: movieData.genre,
            releaseYear: movieData.releaseYear,
            likedBy: [currentUser.uid],
            dislikedBy: [],
            poster: movieData.poster
        };
        addMovie(postMovieDetails)
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
                        Add Movie
                    </Typography>
                    <TextField
                        label="Title"
                        name="title"
                        value={movieData.title}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Genre"
                        name="genre"
                        value={movieData.genre}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Release Year"
                        name="releaseYear"
                        value={movieData.releaseYear}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Poster"
                        name="poster"
                        value={movieData.poster}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" onClick={addNewMovie} style={{ marginTop: 16 }}>
                        Add Movie
                    </Button>
                    <Button variant="contained" onClick={handleClose} style={{ marginTop: 16, marginLeft: 8 }}>
                        Close
                    </Button>
                </Paper>
            </Modal>
        </div>
    );
};

export default MyModal;