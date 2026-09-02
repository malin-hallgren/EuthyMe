import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                <form onSubmit={handleSubmit}>
                    <input
                        htmlFor="Email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        htmlFor="Password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        htmlFor="ConfirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input
                        htmlFor="DisplayName"
                        label="Display Name"
                        type="text"
                        placeholder="Display Name (optional)"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <button type="submit">Register</button>
                </form> 
            </div> 
            <p>
                {hasSubmitted && message.type === 'success' && (
                    <span style={{ color: 'green' }}>{message.text}</span>
                )}
                {hasSubmitted && message.type === 'error' && (
                    <span style={{ color: 'red' }}>{message.text}</span>
                )}
            </p>
            <button onClick={() => { navigate('/login') }}>Back to Login</button>
        </>
         

    )
}