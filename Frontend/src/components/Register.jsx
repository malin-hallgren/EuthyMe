import {registerUser} from '../services/UserServices.js';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentCard from "./UI/ContentCard.jsx";
import PrimaryButton from "./UI/PrimaryButton.jsx";
import InputField from "./InputField.jsx";
import SecondaryButton from "./UI/SecondaryButton.jsx";
import "./Register.css";
import LoginRegisterText from "../text-content/LoginRegisterText.json";

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
            setMessage({type : 'error', text: 'Passwords do not match'});
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
            setMessage({type : 'error', text: errorMessage.errors?.Password?.join(" ") || errorMessage?.title || errorMessage.message || 'An error occurred'});
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
                        <PrimaryButton text={`${LoginRegisterText.RegisterPage.register_btn}`} type="submit" />
                    </form> 
                    <p>
                        {hasSubmitted && message.type === 'success' && (
                            <span style={{ color: 'green' }}>{message.text}</span>
                        )}
                        {hasSubmitted && message.type === 'error' && (
                            <span style={{ color: 'red' }}>{message.text}</span>
                        )}
                    </p>
                <SecondaryButton onClick={() => { navigate('/login') }} text={`${LoginRegisterText.RegisterPage.back_to_login}`}/>
                </ContentCard>
            </div> 
        </>
    )
}