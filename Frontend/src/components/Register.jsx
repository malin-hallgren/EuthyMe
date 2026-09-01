import api from "../api/axios";
import { useState } from "react";

export default function registerUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setHasSubmitted(false);

        try {
            const response = await api.post('/Auth/register', {
                UserName: email,
                Password: password,
                DisplayName: displayName
            })
            .then(response => response.data);

            setMessage({type : 'success', text: response.value.message});
        } catch (error) {
            setMessage({type : 'error', text: error.response.value.message || error.response.value});
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
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Display Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <submit type="submit">Register</submit>
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
        </>
         

    )
}