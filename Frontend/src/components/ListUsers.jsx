import {useState, useEffect} from "react";
import {getUsers} from '../services/UserServices.js';
import ContentCard from "./UI/ContentCard.jsx";

{/*LIKELY DEPRECATED, AS AdminDashboard.jsx IS NOW USED INSTEAD*/}

export default function ListUsers() {
    const [activeUsers, setActiveUsers] = useState([]);
    const [inactiveUsers, setInactiveUsers] = useState([]);
    
    async function ListUsers () {

        try {
            const response = await getUsers();
            setActiveUsers(response.activeUsers || []);
            setInactiveUsers(response.inactiveUsers || []);
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
            <ContentCard>
                <h1>List of Active Users</h1>
                <ul>
                    {activeUsers.map(user => (
                        <li key={user.displayName}>{user.displayName} - {user.lastActive}</li>
                    ))}
                </ul>
            </ContentCard>
            <ContentCard>
                <h1>List of Inactive Users</h1>
                <ul>
                    {inactiveUsers.map(user => (
                        <li key={user.displayName}>{user.displayName} - {user.lastActive}</li>
                    ))}
                </ul>
            </ContentCard>
        </div>
    )
}