import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ allowedRoles }) {
    const { isAuthenticated, userRole } = useAuth();
    const location = useLocation(); 

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const hasAccess = allowedRoles.includes(userRole);

    if (!hasAccess) {
        if (userRole === 'USER' && location.pathname !== '/dashboard') {
            return <Navigate to="/dashboard" replace />;
        }

        if (userRole === 'ADMIN' && location.pathname !== '/admin') {
            return <Navigate to="/admin" replace />;
        }

        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
