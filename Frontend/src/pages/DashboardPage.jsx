import {useState, useEffect} from "react";
import ListReports from "../components/ListReports.jsx";
import Logout from "../components/Logout.jsx";
import CreateMoodReport from "../components/CreateMoodReport.jsx";
import ContentCard from "../components/UI/ContentCard.jsx";
import PopUp from "../components/UI/PopUp.jsx";

export default function Dashboard() {
    const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);
    const handleCloseCreateReport = () => setIsCreateReportOpen(false);

    return (
        <>
            <h1>User Dashboard</h1>
            <ListReports />
            
            <button onClick={() => setIsCreateReportOpen(true)}>
                Create Mood Report
            </button>

            <PopUp isOpen={isCreateReportOpen} onClose={handleCloseCreateReport}>
                <ContentCard>
                    <CreateMoodReport onClose={handleCloseCreateReport} />
                </ContentCard>
            </PopUp>
        </>
    )
}