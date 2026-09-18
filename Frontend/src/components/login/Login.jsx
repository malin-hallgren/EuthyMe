import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser} from '../../services/AuthServices.js';
import { useAuth } from "../../hooks/useAuth.js";
import { useGlobalError } from "../../hooks/useGlobalError.js";

import ErrorMessage from '../error-message/ErrorMessage.jsx';
import ContentCard from '../UI/content-card/ContentCard.jsx';
import PrimaryButton from '../UI/primary-button/PrimaryButton.jsx';
import SecondaryButton from '../UI/secondary-button/SecondaryButton.jsx';
import InputField from '../UI/input-field/InputField.jsx';

import LoginRegisterText from '../../text-content/LoginRegisterText.json';
import ErrorMessagesText from '../../text-content/ErrorMessagesText.json';

import './Login.css'

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsAuthenticated, setUserRole } = useAuth();
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [localError, setLocalError] = useState();
    const { globalError, clearGlobalError } = useGlobalError();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null); // Clear any previous local error messages
        clearGlobalError(); // Clear any previous global error messages
        setHasSubmitted(true);

        try {
            const response = await loginUser({
                UserName: email,
                Password: password,
            });

            const { role } = response;
            setIsAuthenticated(true);
            setUserRole(role);

            if (role === 'ADMIN') {
                navigate('/admin', { replace: true });
            } else if (role === 'USER') {
                navigate('/dashboard', { replace: true });
            }

            console.log('Login successful:', response);
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            const combinedMessage = Array.isArray(errorMessage) 
            ? errorMessage.join(' ') : 
            errorMessage || 
            error.message || 
            'An unexpected error occurred. Please try again.';

            const message = ErrorMessagesText[combinedMessage];

            setLocalError(message);
        }
    };

    return (
        <div className="login-container">
            <ContentCard>
                <h2>{LoginRegisterText.LoginPage.login}</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <InputField 
                        label={`${LoginRegisterText.LoginPage.email}`} 
                        id="email"
                        type="text" 
                        placeholder="Email" 
                        autocomplete="username" 
                        onChange={(e) => setEmail(e.target.value)} 
                        required />
                    <InputField 
                        label={`${LoginRegisterText.LoginPage.password}`}
                        id="password" 
                        type="password" 
                        placeholder="Password" 
                        autocomplete="current-password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    {globalError && (
                        <ErrorMessage message={globalError} type="error" />
                    )}
                    {hasSubmitted && localError && (
                        <ErrorMessage message={localError} type="error" />
                    )}
                    <PrimaryButton 
                        text={`${LoginRegisterText.LoginPage.login}`} 
                        type="submit" />
                </form>
                <SecondaryButton 
                    text={`${LoginRegisterText.LoginPage.register}`} 
                    onClick={() => {
                        clearGlobalError(); // Clear any previous global error messages
                        navigate('/register');
                    }} 
                />
            </ContentCard>
        </div>
    );
}
            