
export interface UserSignUp {
    uid: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    country: string,
    city: string,
    profilePicture: string,
}
export interface UserDetails {
    email: string,
    firstName: string,
    lastName: string,
    country: string,
    city: string,
    profilePicture: string,
}

export interface UserLogin {
    email: string,
    password: string,
}