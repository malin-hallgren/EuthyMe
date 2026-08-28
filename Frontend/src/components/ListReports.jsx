import {useState} from 'react'
import {API_BASE_URL} from '../api/api.jsx';

export default function ListReports() {
    const [reports, setReports] = useState([])

    const ListMoodReports = async (event) => {
        event.preventDefault();
        const response = await fetch(`${API_BASE_URL}/moodreport`, {
            method: 'GET',
            credentials: 'include'
        });

        if(!response.ok)
        {
            console.error('Failed to fetch mood reports:', response.status, response.statusText);
            return;
        }

        const responseData = await response.json();
        setReports(responseData);
        console.log('Fetched mood reports:', responseData);
    }

    return (
        <button onClick={ListMoodReports}>Get Mood Reports</button>
    )

}
