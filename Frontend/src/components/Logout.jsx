import React from "react";
import {API_BASE_URL} from '../api/api.jsx'

export default function Logout() {

    const handleClick = async () => {
        try {
            await fetch(`${API_BASE_URL}/Auth/logout`, {
                method: 'POST',
                credentials: 'include' // Include cookies in the request
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <div className="logout-container">
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}