import ListReports from "../components/ListReports.jsx";
import Logout from "../components/Logout.jsx";

export default function Dashboard() {
    return (
        <>
            <h1>User Dashboard</h1>
            <ListReports />
            <Logout />
        </>
    )
}