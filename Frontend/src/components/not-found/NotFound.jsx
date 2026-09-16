import { useAuth } from "../../hooks/useAuth.js";
import {useSettings} from '../../hooks/useSettings.js'
import {useNavigate} from 'react-router-dom'
import PrimaryButton from '../UI/PrimaryButton.jsx'
import './NotFound.css'

export default function NotFound() {
    const {isAuthenticated, user} = useAuth()
    const {theme} = useSettings()
    const navigate = useNavigate()

    return (
        <div className="not-found-container">
            <h2 className="not-found-title">404 - Page Not Found</h2>
            <p className="not-found-message">The page you are looking for does not exist.</p>
            {isAuthenticated ? (
                <PrimaryButton
                    text="Go to Dashboard"
                    onClick={() => navigate('/dashboard')}
                />
            ) : (
                <PrimaryButton
                    text="Go to Login"
                    onClick={() => navigate('/login')}
                />
            )}
        </div>
    )
}