import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function PublicRoute() {
    const { isAuthenticated, userRole} = useAuth();

    if(isAuthenticated && userRole === 'ADMIN') {
        return <Navigate to="/admin" replace />;
    }
    else if(isAuthenticated && userRole === 'USER') {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
}