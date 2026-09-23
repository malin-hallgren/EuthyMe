import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate } from 'react-router-dom'

import PrimaryButton from '../UI/primary-button/PrimaryButton.jsx'

import './NotFound.css'

export default function NotFound() {
    const {isAuthenticated, userRole} = useAuth()
    const navigate = useNavigate()

    return (
        <div className="not-found-container">
            <h2 className="not-found-title">404 - Page Not Found</h2>
            <p className="not-found-message">The page you are looking for does not exist.</p>
            {isAuthenticated && userRole === 'USER' && (
                <PrimaryButton
                    text="Go to Dashboard"
                    onClick={() => navigate('/dashboard')}
                />
            )}
            {isAuthenticated && userRole === 'ADMIN' && (
                <PrimaryButton
                    text="Go to Admin Panel"
                    onClick={() => navigate('/admin')}
                />
            )}
            {!isAuthenticated && (
                <PrimaryButton
                    text="Go to Login"
                    onClick={() => navigate('/login')}
                />
            )}
        </div>
    )
}