import {useState, useEffect} from "react";
import { useLanguage } from '../../hooks/useLanguage.js';
import {getUsers} from '../../services/UserServices.js';
import {deleteUser} from "../../services/UserServices.js";

import ContentCard from "../UI/content-card/ContentCard.jsx";
import PrimaryButton from "../UI/primary-button/PrimaryButton.jsx";

import './AdminDashboard.css';

export default function AdminDashboard() {
    const { AdminDashboardText } = useLanguage();
    const [activeUsers, setActiveUsers] = useState([]);
    const [inactiveUsers, setInactiveUsers] = useState([]);
    
    async function loadUsers() {

        try {
            const response = await getUsers();
            setActiveUsers(response.activeUsers || []);
            setInactiveUsers(response.inactiveUsers || []);
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    const handleDeactivateUser = async (userId) => {
        try {
            await deleteUser(userId);
            console.log('User deleted');
            await loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        async function fetchUsers() {
            await loadUsers();
        }

        fetchUsers();
    }, []);

    return (
        <>
            <h1>{AdminDashboardText.title}</h1>
            <section className="user-activity-container">
                <ContentCard>
                    <h2>{AdminDashboardText.active_users}</h2>
                    {activeUsers.map(user => (
                        <p key={user.id}>{user.displayName} -     {user.daysAgo} {AdminDashboardText.days_ago}</p>
                    ))}
                </ContentCard>
                <ContentCard >
                    <h2>{AdminDashboardText.inactive_users}</h2>
                    {inactiveUsers.map(user => (
                        <div key={user.id} className="inactive-user-item">
                            <p>{user.displayName} -     {user.daysAgo ? `${user.daysAgo} ${AdminDashboardText.days_ago}` : AdminDashboardText.no_activity} </p>
                            <PrimaryButton onClick={() => handleDeactivateUser(user.id)} text={AdminDashboardText.deactivate_user_btn} />
                        </div>
                    ))}
                </ContentCard>
            </section>
        </>
    )
}