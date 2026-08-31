import {useState} from 'react'
import api from '../api/axios.js';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post('/Auth/login', {
                UserName: email, 
                Password: password 
            })
            .then(response => response.data)
            .then(data => {
                console.log('Login response:', data);
            });
        }
        
        catch (error) {
            console.error('Error during login:', error.response.data.message);
            return
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
            <input id ="email" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value) } required />
            <input id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value) } required />
            <button type="submit">Login</button>
            </form>
        </div>
    )
}