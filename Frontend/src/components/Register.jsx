import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentCard from "./UI/ContentCard.jsx";
import PrimaryButton from "./UI/PrimaryButton.jsx";
import InputField from "./InputField.jsx";
import SecondaryButton from "./UI/SecondaryButton.jsx";
import "./Register.css";

export default function registerUser() {
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
            const response = await api.post('/user/register', {
                Email: email,
                Password: password,
                DisplayName: displayName ? displayName : null
            })
            .then(response => response.data);

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
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit} className="register-form">
                        <InputField
                            htmlFor="Email"
                            label="Email:"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputField
                            htmlFor="Password"
                            label="Password:"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputField
                            htmlFor="ConfirmPassword"
                            label="Confirm Password:"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <InputField
                            htmlFor="DisplayName"
                            label="Display Name:"
                            type="text"
                            placeholder="Display Name (optional)"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        <PrimaryButton text="Register" type="submit" />
                    </form> 
                    <p>
                        {hasSubmitted && message.type === 'success' && (
                            <span style={{ color: 'green' }}>{message.text}</span>
                        )}
                        {hasSubmitted && message.type === 'error' && (
                            <span style={{ color: 'red' }}>{message.text}</span>
                        )}
                    </p>
                <SecondaryButton onClick={() => { navigate('/login') }} text="Back to Login"/>
                </ContentCard>
            </div> 
        </>
         

    )
}