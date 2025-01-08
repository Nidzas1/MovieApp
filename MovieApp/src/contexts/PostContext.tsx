import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, doc, setDoc, getDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../config/config';
import { Post } from '../types/Post';

const PostContext = createContext({});

export function usePost() {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
}

export function PostProvider({ children }: React.PropsWithChildren<{}>) {
    const [posts, setPosts] = useState<Post[]>([])

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postsQuerySnapshot = await getDocs(collection(db, 'posts'))
                const postsData: any = []

                for (const postDoc of postsQuerySnapshot.docs) {
                    const postData = postDoc.data()

                    const userId = postData.userId
                    const movieId = postData.movieId

                    const userDoc = await getDoc(doc(db, 'users', userId))
                    const userData = userDoc.data()

                    const movieDoc = await getDoc(doc(db, 'movies', movieId))
                    const movieData = movieDoc.data()

                    const combinedData = {
                        postId: postDoc.id,
                        post: postData,
                        user: userData,
                        movie: movieData
                    }

                    postsData.push(combinedData)
                }

                setPosts(postsData)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching posts:', error)
                setLoading(false)
            }
        };

        fetchPost();
    }, [])

    const addPost = async ({ content, timestamp, userId, movieId, isLiked }: any) => {
        const postCollectionRef = collection(db, 'posts')

        try {
            const newDocRef = await addDoc(postCollectionRef, {
                content: content,
                timestamp: timestamp,
                userId: userId,
                movieId: movieId,
                isLiked: isLiked,
                comments: [],
            })

            const postDocRef = doc(postCollectionRef, newDocRef.id);
            await setDoc(postDocRef, { postId: newDocRef.id }, { merge: true });

            console.log('Post added successfully!')
        } catch (error) {
            console.log('Error adding post.', error)
        }
    }

    const removePost = async (postId: string) => {
        const postRef = doc(db, 'posts', postId)

        try {
            await deleteDoc(postRef)
            console.log("Deleted")
        }
        catch (err) {
            console.log("Error deleting item.")
        }
    }


    const value = {
        posts,
        addPost,
        removePost
    };

    return (
        <PostContext.Provider value={value}>
            {!loading && children}
        </PostContext.Provider>
    )
}
