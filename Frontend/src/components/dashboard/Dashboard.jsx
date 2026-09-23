import {useState, useEffect} from "react";
import {useSettings} from "../../hooks/useSettings.js";
import {getFullDashboardData} from '../../services/UserServices.js';
import {refreshMoodReports} from "../../services/MoodReportServices.js";

import ContentCard from "../UI/content-card/ContentCard.jsx";
import LineChart from "../UI/chart/Chart.jsx";
import PrimaryButton from "../UI/primary-button/PrimaryButton.jsx";
import PopUp from "../UI/pop-up/PopUp.jsx";
import CreateMoodReport from "../create-mood-report/CreateMoodReport.jsx";
import PanicButton from "../panic-button/PanicButton.jsx";

import DashboardText from "../../text-content/UserDashboardText.json";

import './Dashboard.css';

export default function Dashboard() {
    const {settings} = useSettings();
    const [user, setUser] = useState({});
    const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const handleCloseCreateReport = () => setIsCreateReportOpen(false);

    

    async function handleReportCreated() {
        const refreshedData = await refreshMoodReports(); // Fetch only the updated mood reports
        setUser(prevUser => ({
            ...prevUser,
            moodReports: refreshedData.moodReports,
            hasReportedToday: refreshedData.hasReportedToday,
            averageMoodScore: refreshedData.averageMoodScore,
            averageSleepScore: refreshedData.averageSleepScore,
            amountMissedMeds: refreshedData.amountMissedMeds
        }));
        setIsCreateReportOpen(false); // Close the popup after report creation
        showWarningIfNeeded(refreshedData); // Check if warning needs to be shown after report creation
    }
   
    function showWarningIfNeeded(response) {
        return(
            response.amountMissedMeds > 2 || 
            response.averageMoodScore < 2  && response.averageMoodScore !== 0 ||
            (response.averageSleepScore < 2 &&  response.averageSleepScore !== 0) 
            && response.averageMoodScore > 4
        );
    }

    useEffect(() => {
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

        fetchUserData();
    }, []);

    return (
        <>
            {showWarning && (
                <div className="warning-message">
                    <p>{DashboardText.banner_warning}</p>
                    <button className="close-warning-button" onClick={() => setShowWarning(false)}>&times;</button>
                </div>
            )}
            <section className="dashboard-container">
                <h2>{DashboardText.greeting.replace("{{name}}", settings?.displayName ?? user.displayName ?? "")}</h2>
                <section className="dashboard-content">
                    <section className="dashboard-left-side">
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
                            {settings?.showMeds && (
                                <ContentCard className = "graph-card-small">
                                    <h3 className="graph-card-title">{DashboardText.missed_meds}</h3>
                                    <p className="graph-card-value">{user.amountMissedMeds}</p>
                                </ContentCard>
                            )}
                            </section>
                        </ContentCard>
                        <div className="desktop-panic-button-container">
                            <PanicButton />
                        </div>
                    </section>
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
                                    <CreateMoodReport 
                                        onCreated={handleReportCreated} 
                                        onClose={handleCloseCreateReport} 
                                    />
                            </PopUp>
                        </ContentCard>
                        <ContentCard className = "graph-card-small">
                            <h3 className="graph-card-title resources-title">{DashboardText.resources.header}</h3>
                            <p className="graph-card-description">{DashboardText.resources.description}</p>
                            <section className="resources-list-container">
                                <ul className="resources-list">
                                    {Object.values(DashboardText.resources.list).map((resource, index) => (
                                        <li key={index} className="resource-item">
                                            <p><span className="resource-title">{resource.title}: </span>{resource.description}</p>
                                            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">{resource.link_text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </ContentCard>
                    </section>
                    <div className="mobile-panic-button-container">
                        <PanicButton />
                    </div>
                </section>
            </section>
        </>
    )

}