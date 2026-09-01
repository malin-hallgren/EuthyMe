import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';

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
            <form onSubmit={handleSubmit}>
                <input id="email" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}