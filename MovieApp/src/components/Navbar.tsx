
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';
import '../styles/Navbar.scss';
import { useAuth } from '../contexts/AuthContext';



const Navbar: React.FC = () => {

    const { currentUser }: any = useAuth()

    return (
        <AppBar position="fixed" className="navbar" sx={{ backgroundColor: '#202324' }}>
            <Toolbar>
                <Typography variant="h6" component={Link} to="/home" className="navbar__brand" sx={{ color: 'white' }}>
                    MovieApp
                </Typography>
                <div className="navbar__nav">
                    <Button component={Link} to="/home" className="navbar__nav-link" sx={{ color: 'white' }}>
                        Home
                    </Button>
                    <Button component={Link} to="/dashboard" className="navbar__nav-link" sx={{ color: 'white' }}>
                        Dashboard
                    </Button>
                    {currentUser && (
                        <Button component={Link} to={`/profile/${currentUser.uid}`} className="navbar__nav-link" sx={{ color: 'white' }}>
                            Profile
                        </Button>
                    )}
                    <SignOutButton />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;