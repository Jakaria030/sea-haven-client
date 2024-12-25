import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Spinner from '../loader/Spinner';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <Spinner></Spinner>;
    }

    if(user && user?.email){
        return children;
    }

    return (
        <Navigate to='/login-page' state={location.pathname} />
    );
};

export default PrivateRoute;