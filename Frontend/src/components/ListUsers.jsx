import {useState, useEffect} from "react";
import api from '../api/axios.js';

export default function ListUsers() {
    const [users, setUsers] = useState([]);
    
    async function ListUsers () {

        try {
            await api.get('/user')
            .then(response => response.data)
            .then(data => {
                setUsers(data);
                console.log('Fetched users:', data);
            })
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    useEffect(() => {
        ListUsers();
    }, []);

    return (
        <div>
            <h1>List of Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.displayName}>{user.displayName} - {user.lastActive}</li>
                ))}
            </ul>
        </div>
    )
}