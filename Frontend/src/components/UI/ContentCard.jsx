import react from 'react';
import './ContenCard.css';

export default function ContentCard({ children }) {

    return (
        <div className="content-card">
            {children}
        </div>
    )
}