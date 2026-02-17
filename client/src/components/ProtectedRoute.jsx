import { Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

const ProtectedRoute = () => {
    const { token } = useAuth();

    //If token doesnt exist, boot back to login page
    if(!token){
        return <Navigate to="/login" replace />
    }

    //If token exists, render the landing page
    return <Outlet />
};

export default ProtectedRoute;