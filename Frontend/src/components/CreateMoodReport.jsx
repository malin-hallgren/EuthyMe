import { useState } from 'react';
import UserDashboardText from '../text-content/UserDashboardText.json';
import { createMoodReport } from '../services/MoodReportServices.js';
import ScaleSelector from './UI/ScaleSelector.jsx';
import PrimaryButton from './UI/PrimaryButton.jsx';
import './CreateMoodReport.css';

export default function CreateMoodReport({onClose, onCreated}) {
    const [mood, setMood] = useState('');
    const [sleep, setSleep] = useState('');
    const [medsTaken, setMedsTaken] = useState();

    const isFormComplete = mood !== '' && sleep !== '' && medsTaken !== undefined;

    const moodOptions = {
        1: { text: UserDashboardText.mood.option1 },
        2: { text: UserDashboardText.mood.option2 },
        3: { text: UserDashboardText.mood.option3 },
        4: { text: UserDashboardText.mood.option4 },
        5: { text: UserDashboardText.mood.option5 }
    };

    const sleepOptions = {
        1: { text: UserDashboardText.sleep.option1 },
        2: { text: UserDashboardText.sleep.option2 },
        3: { text: UserDashboardText.sleep.option3 },
        4: { text: UserDashboardText.sleep.option4 },
        5: { text: UserDashboardText.sleep.option5 }
    };

    const medsOptions = {
        true: { text: UserDashboardText.meds.option1 },
        false: { text: UserDashboardText.meds.option2 }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                moodScore: Number(mood),
                sleepScore: Number(sleep),
                medsTaken: medsTaken === 'true' || medsTaken === true //force boolean
            };
            await createMoodReport(payload);
            
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
        <div className="create-mood-report-container">
            <form onSubmit={handleSubmit}>
                <ScaleSelector className="scale-selector-block"
                    label={UserDashboardText.mood.header}
                    description={UserDashboardText.mood.description}
                    name="mood"
                    selected={mood}
                    onChange={setMood}
                    optionsMap={moodOptions}
                    required 
                />
                <ScaleSelector className="scale-selector-block"
                    label={UserDashboardText.sleep.header}
                    description={UserDashboardText.sleep.description}
                    name="sleep"
                    selected={sleep}
                    onChange={setSleep}
                    optionsMap={sleepOptions}
                    required 
                />
                <ScaleSelector className="scale-selector-block"
                    label={UserDashboardText.meds.header}
                    textKey="meds"
                    description={UserDashboardText.meds.description}
                    name="medsTaken"
                    selected={medsTaken}
                    onChange={setMedsTaken}
                    optionsMap={medsOptions}
                    required 
                />
                <PrimaryButton 
                    type="submit" 
                    text={UserDashboardText.create_mood_report_btn_active} 
                    disabled={!isFormComplete}/>     
            </form>
        </div>
    )
}