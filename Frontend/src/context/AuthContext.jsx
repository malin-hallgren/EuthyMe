import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const response = await api.get('/Auth/status');
                setIsAuthenticated(response.data.isAuthenticated);
                setUserRole(response.data.role);
            }
            catch (error) {
                console.error('Error checking authentication status:', error);
            }
            finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    if (loading) 
    {
        return <div>Loading...</div>;
    }
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, setIsAuthenticated, setUserRole }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);