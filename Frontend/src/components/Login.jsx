import {useState} from 'react'
import {API_BASE_URL} from '../api/api.jsx'

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
                    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ UserName: email, Password: password }),
                credentials: 'include' // Include cookies in the request
            });

            const responseData = await response.json();

            if (!response.ok) {
                console.error('Login failed:', responseData.message);
                return;
            }

            console.log(responseData.message);
        }
        
        catch (error) {
            console.error('Error during login:', error);
            return
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value) } required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value) } required />
            <button type="submit">Login</button>
            </form>
        </div>
    )
}