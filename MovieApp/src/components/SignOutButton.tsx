import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@mui/material';

const SignOutButton = () => {

    const { signout }: any = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            await signout();
            console.log('User signed out successfully');
            navigate('/auth/signin')
            window.location.reload()
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }
    return (
        <Button onClick={handleLogout} sx={{ color: 'white', border: '1px solid black', backgroundColor: '#66FCF1' }}>Sign out</Button>
    )
}

export default SignOutButton