import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from '../api/axios.js';

export default function Logout() {
    const { setIsAuthenticated, setUserRole } = useAuth();

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await api.post('/Auth/logout')
            .then(response => {
                console.log('Logged out from EuthyMe');

                setIsAuthenticated(false);
                setUserRole(null);

                navigate('/login');
            });
        } 
        catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <div className="logout-container">
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}