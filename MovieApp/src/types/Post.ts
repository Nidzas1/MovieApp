export interface Post {
    content: string,
    timestamp: string,
    userId: string,
    email: string,
    movieId: string,
    profilePicture: string,
}

export interface PostDetails {
    content: string,
    timestamp: string,
    userId: string,
    movieId: string,
    comments: any[],
    isLiked: boolean

}

export interface PostMovieDetails {
    title: string,
    genre: string,
    releaseYear: number,
    likedBy: any[],
    dislikedBy: any[],
}

