import { useAuth } from "../../contexts/AuthContext";


const Home = () => {
    const { currentUser }: any = useAuth()

    return (
        <>
            <h1>Welcome to Home Page, {currentUser?.email}</h1>
        </>
    )
};

export default Home;
