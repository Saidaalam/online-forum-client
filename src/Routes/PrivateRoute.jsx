import { useContext } from "react";
import { AuthContext } from "../assets/Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoutes = (props) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    if (!user) {
        return <Navigate state={location.pathname} to="/login" />;
    }

    return props.children;
};

export default PrivateRoutes;
