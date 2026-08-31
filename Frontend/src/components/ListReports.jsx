import {useState} from 'react'
import api from '../api/axios.js';

export default function ListReports() {
    const [reports, setReports] = useState([])

    const ListMoodReports = async (event) => {
        event.preventDefault();
        try {
            const response = api.get(`/moodreport`)
            .then((response) => {
                setReports(response.data);
                console.log('Mood reports response:', response.data);
            });
        }

        catch (error)
        {
            console.error('Failed to fetch mood reports:', error.response.status,error.response.data.message);
            return;
        }

    }

    return (
        <button onClick={ListMoodReports}>Get Mood Reports</button>
    )

}
