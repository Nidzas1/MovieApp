import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, query, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../config/config'; // Import your Firebase configuration
import { useAuth } from './AuthContext';
import { Movie } from '../types/Movie';

const MovieContext = createContext({});

export function useMovie() {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('movieContext must be used within a PostProvider');
    }
    return context as { movies: Movie[], addMovie: (data: { text: string, userId: string }) => void }
}


export function MovieProvider({ children }: React.PropsWithChildren<{}>) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    const { currentUser }: any = useAuth()

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const moviesQuery = query(collection(db, 'movies'))
                const postsSnapshot = await getDocs(moviesQuery)

                const movieData: any = postsSnapshot.docs.map((doc) => ({
                    title: doc.data().title,
                    genre: doc.data().genre,
                    releaseYear: doc.data().releaseYear,
                    likedBy: doc.data().likedBy,
                    movieId: doc.data().movieId,
                    dislikedBy: doc.data().dislikedBy,
                    poster: doc.data().poster
                }))

                setMovies(movieData)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching movie titles:', error);
                setLoading(false);
            }
        }
        if (currentUser) {
            fetchMovieData();
        } else {
            setLoading(false);
        }
    }, [currentUser])


    const addMovie = async ({ title, genre, releaseYear, poster }: Movie) => {
        const moviesCollectionRef = collection(db, 'movies');

        try {
            const newDocRef = await addDoc(moviesCollectionRef, {
                title: title,
                genre: genre,
                releaseYear: releaseYear,
                likedBy: [],
                dislikedBy: [],
                poster: poster
            });

            const movieDocRef = doc(moviesCollectionRef, newDocRef.id);
            await setDoc(movieDocRef, { movieId: newDocRef.id }, { merge: true });

            console.log('Movie added successfully!');
        } catch (error) {
            console.error('Error adding movie: ', error);
        }
    }

    const value = {
        movies,
        addMovie,
    };

    return (
        <MovieContext.Provider value={value}>
            {!loading && children}
        </MovieContext.Provider>
    )
}
