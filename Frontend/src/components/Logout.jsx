import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useSettings } from "../hooks/useSettings.js";
import {LogoutUser} from "../services/AuthServices.js";
import {LogoutIcon} from "./UI/icons/LogoutIcon.jsx";

export default function Logout() {
    const { setIsAuthenticated, setUserRole } = useAuth();
    const { setSettings } = useSettings();

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await LogoutUser();
            setIsAuthenticated(false);
            setUserRole(null);
            setSettings(null);
            navigate('/login');
        } 
        catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
            <button className="logout-button" onClick={handleClick}>
                <LogoutIcon className="custom-icon logout-icon" />
                <span>Logout</span>
            </button>
    )
}