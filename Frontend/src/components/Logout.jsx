import React from "react";
import api from '../api/axios.js';

export default function Logout() {

    const handleClick = async () => {
        try {
            await api.post('/Auth/logout')
            .then(response => {
                console.log('Logged out from EuthyMe');
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