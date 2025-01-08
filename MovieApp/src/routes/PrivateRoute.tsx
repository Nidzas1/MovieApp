import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
    component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    const { currentUser }: any = useAuth();

    return currentUser ? (
        <Component />
    ) : (
        <Navigate to="/auth/signin" replace />
    );
};

export default PrivateRoute;