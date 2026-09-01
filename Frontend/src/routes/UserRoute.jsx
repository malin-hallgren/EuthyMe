import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function UserRoute() {
    const { isAuthenticated, userRole } = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if(userRole === "ADMIN") {
        return <Navigate to="/admin" replace />;
    }


    return <Outlet />;
}