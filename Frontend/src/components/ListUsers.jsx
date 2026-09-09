import {useState, useEffect} from "react";
import {getUsers} from '../services/UserServices.js';

export default function ListUsers() {
    const [users, setUsers] = useState([]);
    
    async function ListUsers () {

        try {
            const response = await getUsers();
            setUsers(response);
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