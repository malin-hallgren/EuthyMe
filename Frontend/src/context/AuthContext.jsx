import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false; 

        const checkAuth = async () => {
            try {
                const response = await api.get('/Auth/status');
                
                if (cancelled) return;

                setIsAuthenticated(Boolean(response.data.isAuthenticated));
                setUserRole(response.data.role ?? null);
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

export const useAuth = () => useContext(AuthContext);
