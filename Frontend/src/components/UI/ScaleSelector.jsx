import React from 'react'; // Fixed capitalization typo

export default function ScaleSelector({ label, name, selected, onChange, optionsMap }) {
    return (
        <div className="scale-selector">
            <span className="scale-selector-label">{label}</span>
            
            <div className="scale-group">
                {Object.entries(optionsMap).map(([value]) => {
                    const isSelected = String(selected) === String(value);
                    
                    return (
                        <label 
                            key={value} 
                            className={`scale-option ${isSelected ? "selected" : ""}`}
                        >
                            <input
                                type="radio"
                                name={name}
                                value={value}
                                checked={isSelected}
                                onChange={(e) => onChange(e.target.value)} // Passes value directly to your state setter
                                className="scale-input"
                            />
                            <span className="scale-number">{value}</span>
                        </label>
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
