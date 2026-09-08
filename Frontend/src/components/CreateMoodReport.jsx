import react from 'react';
import { useState } from 'react';
import ContentCard from './UI/ContentCard.jsx';
import api from '../api/axios.js';
import ScaleSelector from './UI/ScaleSelector.jsx';

export default function CreateMoodReport({onClose, onCreated}) {
    const [mood, setMood] = useState('');
    const [sleep, setSleep] = useState('');
    const [medsTaken, setMedsTaken] = useState(false);

    const moodOptions = {
        1: 'Very Bad',
        2: 'Bad',
        3: 'Neutral',
        4: 'Good',
        5: 'Very Good'
    };

    const sleepOptions = {
        1: 'Less than 4 hours',
        2: '4-6 hours',
        3: '6-8 hours',
        4: '8-10 hours',
        5: 'More than 10 hours'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                moodScore: Number(mood),
                sleepScore: Number(sleep),
                medsTaken: medsTaken === 'true' || medsTaken === true //force boolean
            };
            const response = await api.post('/moodreport', payload)
            .then(response => response.data);
            console.log(response.message);
            
            if (onCreated) {
                onCreated(); // Notify parent component of successful creation
            }

            if (onClose) {
                onClose(); // Close the popup after submission
            }

        } catch (error) {
            console.error('Error submitting mood report:', error.response?.data || error.message);
        }
    }


    return (
        <ContentCard>
            <form onSubmit={handleSubmit}>
                <ScaleSelector
                    label="Mood"
                    name="mood"
                    selected={mood}
                    onChange={setMood}
                    optionsMap={moodOptions}
                />
                <ScaleSelector
                    label="Sleep"
                    name="sleep"
                    selected={sleep}
                    onChange={setSleep}
                    optionsMap={sleepOptions}
                />
                <ScaleSelector
                    label="Meds Taken"
                    name="medsTaken"
                    selected={medsTaken}
                    onChange={setMedsTaken}
                    optionsMap={{ true: 'Yes', false: 'No' }}
                />
                <button type="submit">Submit Mood Report</button>
            </form>
        </ContentCard>
    )
}