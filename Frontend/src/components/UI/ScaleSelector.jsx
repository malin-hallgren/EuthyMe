import React from 'react';
import { ScaleSelectorValue1 } from './icons/ScaleSelectorValue1.jsx';
import { ScaleSelectorValue2 } from './icons/ScaleSelectorValue2.jsx';
import { ScaleSelectorValue3 } from './icons/ScaleSelectorValue3.jsx';
import { ScaleSelectorValue4 } from './icons/ScaleSelectorValue4.jsx';
import { ScaleSelectorValue5 } from './icons/ScaleSelectorValue5.jsx';

const scaleValueIcons = {
    1: ScaleSelectorValue1,
    2: ScaleSelectorValue2,
    3: ScaleSelectorValue3,
    4: ScaleSelectorValue4,
    5: ScaleSelectorValue5,
};

export default function ScaleSelector({ label, name, selected, onChange, optionsMap }) {
    return (
        <div className="scale-selector">
            <span className="scale-selector-label">{label}</span>
            
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
                                onChange={(e) => onChange(e.target.value)} //   Passes value directly to your state setter
                                className="scale-input"
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
                {selected ? `Selected: ${optionsMap[selected]}` : `Select a ${label.toLowerCase()}`}
            </div>
        </div> 
    );
}
