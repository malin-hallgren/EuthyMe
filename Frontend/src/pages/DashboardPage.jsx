import ListUsers from "../components/ListUsers.jsx";
import ListReports from "../components/ListReports.jsx";
import Logout from "../components/Logout.jsx";
export default function Dashboard() {

    return (
        <>
            <h1>Användare</h1>
            <ListUsers />
            <ListReports />
            <Logout />
        </>
    )
}