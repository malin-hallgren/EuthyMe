import {useState, useEffect} from "react";
import {getUsers} from '../services/UserServices.js';
import ContentCard from "./UI/ContentCard.jsx";
import PrimaryButton from "./UI/PrimaryButton.jsx";
import './AdminDashboard.css';
import AdminDashboardText from "../text-content/AdminDashboardText.json";

export default function AdminDashboard() {
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
        <>
            <h1>Admin Dashboard</h1>
            <section className="user-activity-container">
                <ContentCard>
                    <h2>List of Active Users</h2>
                    {activeUsers.map(user => (
                        <p key={user.displayName}>{user.displayName} -     {user.daysAgo} {AdminDashboardText.days_ago}</p>
                    ))}
                </ContentCard>
                <ContentCard>
                    <h2>List of Inactive Users</h2>
                    {inactiveUsers.map(user => (
                        <div key={user.displayName} className="inactive-user-item">
                            <p>{user.displayName} -     {user.daysAgo} {AdminDashboardText.days_ago}</p>
                            <PrimaryButton onClick={() => handleDeactivateUser(user.id)} text={AdminDashboardText.deactivate_user_btn} />
                        </div>
                    ))}
                </ContentCard>
            </section>
        </>
    )
}