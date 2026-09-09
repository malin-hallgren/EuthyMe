import {useState, useEffect} from "react";
import ContentCard from "./UI/ContentCard";
import LineChart from "./Chart";
import PrimaryButton from "./UI/PrimaryButton";
import PopUp from "./UI/PopUp";
import CreateMoodReport from "./CreateMoodReport";
import {getFullDashboardData} from '../services/UserServices.js';
import DashboardText from "../text-content/UserDashboardText.json";
import './Dashboard.css';

export default function Dashboard() {
    const [user, setUser] = useState({});
    const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const handleCloseCreateReport = () => setIsCreateReportOpen(false);

    async function fetchUserData() {
        try {
            const response = await getFullDashboardData();
            setUser(response);
            setShowWarning(showWarningIfNeeded(response));
            console.log('Fetched user data:', response);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    async function handleReportCreated() {
        await fetchUserData(); // Refresh user data after a new report is created, improve this to ONLY fetch reports
        setIsCreateReportOpen(false); // Close the popup after report creation
    }
   
    function showWarningIfNeeded(response) {
        return (
            response.amountMissedMeds > 2 || 
            response.averageMoodScore < 2 || 
            response.averageSleepScore < 2 && response.averageMoodScore > 4
        );
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <>
            {showWarning && (
                <div className="warning-message">
                    <p>{DashboardText.banner_warning}</p>
                </div>
            )}
            <section className="dashboard-container">
                <h2>{DashboardText.greeting.replace("{{name}}", user.displayName)}</h2>
                <section className="dashboard-content">
                    <ContentCard className = "graph-card-big">
                        <ContentCard className = "graph-card-graph">
                            <LineChart chartData={user.moodReports} />
                        </ContentCard>
                        <section className="dashboard-graph-stats">
                            <ContentCard className = "graph-card-small">
                                <h3 className="graph-card-title">{DashboardText.avg_sleep}</h3>
                                <p className="graph-card-value">{user.averageSleepScore}</p>
                            </ContentCard>
                            <ContentCard className = "graph-card-small">
                                <h3 className="graph-card-title">{DashboardText.avg_mood}</h3>
                                <p className="graph-card-value">{user.averageMoodScore}</p>
                            </ContentCard>
                            <ContentCard className = "graph-card-small">
                                <h3 className="graph-card-title">{DashboardText.missed_meds}</h3>
                                <p className="graph-card-value">{user.amountMissedMeds}</p>
                            </ContentCard>
                        </section>
                    </ContentCard>
                    <section className="dashboard-right-side">
                        <ContentCard className = "graph-card-small">
                            <h3 className="graph-card-title">
                                {user.hasReportedToday ? DashboardText.create_mood_report_btn_inactive : DashboardText.create_mood_report_btn_active}
                            </h3>
                            <p className="graph-card-description">{DashboardText.create_mood_report_description}</p>
                            <PrimaryButton 
                                className="graph-card-create-mood-report-button" 
                                disabled={user.hasReportedToday}
                                text={user.hasReportedToday ? DashboardText.create_mood_report_btn_inactive : DashboardText.create_mood_report_btn_active}
                                onClick={() => setIsCreateReportOpen(true)} />
                            <PopUp isOpen={isCreateReportOpen} onClose={handleCloseCreateReport}>
                                <ContentCard>
                                    <CreateMoodReport 
                                        onCreated={handleReportCreated} 
                                        onClose={handleCloseCreateReport} 
                                    />
                                </ContentCard>
                            </PopUp>
                        </ContentCard>
                        <ContentCard className = "graph-card-small">
                            <p className="graph-card-title resourcesTitle">{DashboardText.resources_title}</p>
                            <p className="graph-card-description">{DashboardText.resources_description}</p>
                        </ContentCard>
                    </section>
                </section>
            </section>
        </>
    )

}