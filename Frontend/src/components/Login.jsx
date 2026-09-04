import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import ContentCard from './UI/ContentCard.jsx';
import PrimaryButton from './UI/PrimaryButton.jsx';
import SecondaryButton from './UI/SecondaryButton.jsx';
import InputField from './InputField.jsx';
import './Login.css'

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsAuthenticated, setUserRole } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/Auth/login', {
                UserName: email,
                Password: password,
            });

            const { role } = response.data;
            setIsAuthenticated(true);
            setUserRole(role);

            if (role === 'ADMIN') {
                navigate('/admin', { replace: true });
            } else if (role === 'USER') {
                navigate('/dashboard', { replace: true });
            }

            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <ContentCard>
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <InputField label="Email:" id="email" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <InputField label="Password:" id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <PrimaryButton text="Login" type="submit" />
                </form>
                <SecondaryButton text="Register" onClick={() => navigate('/register')} />
            </ContentCard>
        </div>
    );
}
            