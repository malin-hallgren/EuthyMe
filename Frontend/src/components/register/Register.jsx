import {registerUser} from '../../services/UserServices.js';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SecondaryButton from "../UI/secondary-button/SecondaryButton.jsx";
import ContentCard from "../UI/content-card/ContentCard.jsx";
import PrimaryButton from "../UI/primary-button/PrimaryButton.jsx";
import InputField from "../UI/input-field/InputField.jsx";
import ErrorMessage from "../error-message/ErrorMessage.jsx";

import LoginRegisterText from "../../text-content/LoginRegisterText.json";
import ErrorMessagesText from "../../text-content/ErrorMessagesText.json";

import "./Register.css";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setHasSubmitted(false);
        if (password !== confirmPassword) {
            setMessage({type : 'error', text: 'ERR_PASSWORDS_DO_NOT_MATCH'});
            setHasSubmitted(true);
            return;
        }

        try {
            const response = await registerUser({
                Email: email,
                Password: password,
                DisplayName: displayName ? displayName : null
            });

            setMessage({type : 'success', text: response.message});
        } catch (error) {
            const errorMessage = error?.response?.data;
            setMessage({type : 'error', text: errorMessage || 'ERR_GENERIC_REGISTER_ERROR'});
        }
        finally {
            setHasSubmitted(true);
        }
    }

    return (
        <>
            <div className="register-container">
                <ContentCard>
                    <h2>{LoginRegisterText.RegisterPage.register}</h2>
                    <form onSubmit={handleSubmit} className="register-form">
                        <InputField
                            htmlFor="Email"
                            label={`${LoginRegisterText.RegisterPage.email}`}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputField
                            htmlFor="Password"
                            label={`${LoginRegisterText.RegisterPage.password}`}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputField
                            htmlFor="ConfirmPassword"
                            label={`${LoginRegisterText.RegisterPage.confirmPassword}`}
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <InputField
                            htmlFor="DisplayName"
                            label={`${LoginRegisterText.RegisterPage.display_name}`}
                            type="text"
                            placeholder="Display Name (optional)"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        {hasSubmitted && message.type === 'success' && (
                            <ErrorMessage message={ErrorMessagesText.SUC_USER_REGISTERED} type="success" />
                        )}
                        {hasSubmitted && message.type === 'error' &&  (
                            <ErrorMessage message={ErrorMessagesText[message.text] || message.text} type="error" />
                        )}
                        <PrimaryButton text={`${LoginRegisterText.RegisterPage.register_btn}`} type="submit" />
                    </form> 
                    
                   
                <SecondaryButton onClick={() => { navigate('/login') }} text={`${LoginRegisterText.RegisterPage.back_to_login}`}/>
                </ContentCard>
            </div> 
        </>
    )
}