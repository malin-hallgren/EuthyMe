import React from 'react';
import UserDashboardText from '../../text-content/UserDashboardText.json';
import { ScaleSelectorValue1 } from './icons/ScaleSelectorValue1.jsx';
import { ScaleSelectorValue2 } from './icons/ScaleSelectorValue2.jsx';
import { ScaleSelectorValue3 } from './icons/ScaleSelectorValue3.jsx';
import { ScaleSelectorValue4 } from './icons/ScaleSelectorValue4.jsx';
import { ScaleSelectorValue5 } from './icons/ScaleSelectorValue5.jsx';
import { ScaleSelectorValueTrue } from './icons/ScaleSelectorValueTrue.jsx';
import { ScaleSelectorValueFalse } from './icons/ScaleSelectorValueFalse.jsx';

const scaleValueIcons = {
    1: ScaleSelectorValue1,
    2: ScaleSelectorValue2,
    3: ScaleSelectorValue3,
    4: ScaleSelectorValue4,
    5: ScaleSelectorValue5,
    true: ScaleSelectorValueTrue,
    false: ScaleSelectorValueFalse
};


export default function ScaleSelector({ label, description,name, selected, onChange, optionsMap, required }) {

    const textContent = UserDashboardText[label] || {};
    const displayLabel = textContent.header || label;
    const hasSelection = selected !== undefined && selected !== null && selected !== '';

    return (
        <div className="scale-selector">
            <span className="scale-selector-label">{displayLabel || label}</span>
            <span className="scale-selector-description">{textContent.description || description}</span>
            
            <div className="scale-group">
                {Object.entries(optionsMap).map(([value]) => {
                    const isSelected = String(selected) === String(value);
                    const ScaleIcon = scaleValueIcons[value];
                    
                    return (
                        <React.Fragment key={value}>
                            <input
                                type="radio"
                                id={`scale-${name}-${value}`}
                                name={name}
                                value={value}
                                checked={isSelected}
                                onChange={(e) => onChange(e.target.value)} 
                                className="scale-input"
                                required={required}
                            />
                            <label
                                className={`scale-option ${isSelected ? "selected" : ""}`}
                                htmlFor={`scale-${name}-${value}`}
                            >
                                {ScaleIcon ? <ScaleIcon aria-hidden="true" /> : optionsMap[value]}
                            </label>
                        
                        </React.Fragment>

                    );
                })}
            </div>

            {/* Bottom context label shows the text description (e.g., "Good") */}
            <div className="context-label">
                {hasSelection
                 ? UserDashboardText.selected.replace(
                       '{{option}}',
                       optionsMap[selected].text
                   ).replace('{{label}}', displayLabel.toLowerCase())
                 : UserDashboardText.select_prompt.replace(
                       '{{label}}',
                       displayLabel.toLowerCase()
                )}
            </div>
        </div> 
    );
}
