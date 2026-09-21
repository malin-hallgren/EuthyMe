import { useState } from 'react';
import { createMoodReport } from '../../services/MoodReportServices.js';
import { useSettings } from '../../hooks/useSettings.js';

import ScaleSelector from '../UI/scale-selector/ScaleSelector.jsx';
import PrimaryButton from '../UI/primary-button/PrimaryButton.jsx';

import UserDashboardText from '../../text-content/UserDashboardText.json';

import './CreateMoodReport.css';

export default function CreateMoodReport({onClose, onCreated}) {
    const [mood, setMood] = useState('');
    const [sleep, setSleep] = useState('');
    const [medsTaken, setMedsTaken] = useState();
    const { settings } = useSettings();

    const isFormComplete = mood !== '' && sleep !== '' && (settings?.showMeds ? medsTaken !== undefined : true);

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
                medsTaken: settings?.showMeds ? (medsTaken === 'true' || medsTaken === true) : true
            };
            await createMoodReport(payload);
            
            if (onCreated) {
                onCreated();
            }

            if (onClose) {
                onClose();
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
                {settings?.showMeds && (
                    <ScaleSelector className="scale-selector-block"
                        label={UserDashboardText.meds.header}
                        textKey="meds"
                        description={UserDashboardText.meds.description}
                        name="medsTaken"
                        selected={medsTaken} 
                        onChange={setMedsTaken}
                        optionsMap={medsOptions}
                        required = {settings?.showMeds} // Only required if showMeds is true
                    />
                )}
                <PrimaryButton 
                    type="submit" 
                    text={UserDashboardText.create_mood_report_btn_active} 
                    disabled={!isFormComplete}/>     
            </form>
        </div>
    )
}