import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.js";
import {CheckAuthStatus} from "../../services/AuthServices.js";

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false; 

        const checkAuth = async () => {
            try {
                const response = await CheckAuthStatus();
                
                if (cancelled) return;

                setIsAuthenticated(Boolean(response.isAuthenticated));
                setUserRole(response.role ?? null);
            }
            catch (error) {
                if (cancelled) return;
                console.error('Error checking authentication status:', error.message);
            }
            finally {
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

