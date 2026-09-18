import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.js";
import { checkAuthStatus } from "../../services/AuthServices.js";

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false; 

        const checkAuth = async () => {
            try {
                const response = await checkAuthStatus();

                if (cancelled) return;

                setIsAuthenticated(response.isAuthenticated);
                setUserRole(response.isAuthenticated ? response.role ?? null : null);
                
            } catch (error) {

                if (cancelled) return;
                console.error('Error checking authentication status:', error.message);
                
                setIsAuthenticated(false);
                setUserRole(null);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        checkAuth();

        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, setIsAuthenticated, setUserRole }}>
            {children}
        </AuthContext.Provider>
    );
};

