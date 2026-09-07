import {useState, useEffect} from "react";
import ListReports from "../components/ListReports.jsx";
import CreateMoodReport from "../components/CreateMoodReport.jsx";
import ContentCard from "../components/UI/ContentCard.jsx";
import PopUp from "../components/UI/PopUp.jsx";
import Dashboard from "../components/Dashboard.jsx";

export default function DashboardPage() {
    const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);
    const handleCloseCreateReport = () => setIsCreateReportOpen(false);

    return (
        <>
            {/* <h1>User Dashboard</h1>
            <ListReports />
            
            <button onClick={() => setIsCreateReportOpen(true)}>
                Create Mood Report
            </button>

            <PopUp isOpen={isCreateReportOpen} onClose={handleCloseCreateReport}>
                <ContentCard>
                    <CreateMoodReport onClose={handleCloseCreateReport} />
                </ContentCard>
            </PopUp> */}
            <Dashboard />
        </>
    )
}