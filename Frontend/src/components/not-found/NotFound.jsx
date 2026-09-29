import { useAuth } from "../../hooks/useAuth.js";
import { useLanguage } from '../../hooks/useLanguage.js';
import { useNavigate } from 'react-router-dom'

import PrimaryButton from '../UI/primary-button/PrimaryButton.jsx'

import './NotFound.css'

export default function NotFound() {
    const {isAuthenticated, userRole} = useAuth()
    const { NotFoundText } = useLanguage();
    const navigate = useNavigate()

    return (
        <div className="not-found-container">
            <h2 className="not-found-title">{NotFoundText.title}</h2>
            <p className="not-found-message">{NotFoundText.description}</p>
            {isAuthenticated && userRole === 'USER' && (
                <PrimaryButton
                    text={NotFoundText.dashboard}
                    onClick={() => navigate('/dashboard')}
                />
            )}
            {isAuthenticated && userRole === 'ADMIN' && (
                <PrimaryButton
                    text={NotFoundText.admin}
                    onClick={() => navigate('/admin')}
                />
            )}
            {!isAuthenticated && (
                <PrimaryButton
                    text={NotFoundText.login}
                    onClick={() => navigate('/login')}
                />
            )}
        </div>
    )
}