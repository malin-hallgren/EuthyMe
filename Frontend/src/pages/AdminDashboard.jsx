import ListUsers from "../components/ListUsers.jsx";
import Logout from "../components/Logout.jsx";

export default function AdminDashboard() {
    return (
        <>
            <h1>Admin Dashboard</h1>
            <ListUsers />
            <Logout />
        </>
    )
}